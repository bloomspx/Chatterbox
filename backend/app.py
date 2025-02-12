from flask import Flask, render_template, request, redirect, jsonify, send_file
from nlp import run_chatterbox, generate_sentiments, generate_summary, generate_topics, generate_word_cloud, extract_text, extract_results
from main_vosk import run_vosk
from flask_cors import CORS
from nltk.tokenize import sent_tokenize, word_tokenize
import requests, os, time, sys, base64, nltk, json


app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "Flask server is currently running on localhost:5000."


### ------ TEXT ANALYSIS METHODS ------ ###

@app.route('/text-analysis', methods=['POST'])
def performTA():
    try:
        dir_path = os.path.abspath('')
        nltk.data.path.append(dir_path + '/models/nltk_data')
        request_file = request.get_json()
        filename = request_file['name']
        data = request_file['data']
        text = extract_text(filename, data)

        num_sent = len(sent_tokenize(text))
        num_words = len(word_tokenize(text))

        sentimentJson = generate_sentiments(text)
        summarizedJson = generate_summary(text)
        topicJson = generate_topics(text)
        wordcloudJson = generate_word_cloud(text, filename)

        outJson = {
            'filename':filename,
            'text':text,
            'sentcount':num_sent,
            'wordcount':num_words,
            **summarizedJson,
            **sentimentJson,
            **topicJson,
            **wordcloudJson
        }
        with open(dir_path +  '/output/json/results_{}.json'.format(filename), 'w', encoding='utf-8') as f:
            json.dump(outJson, f, ensure_ascii=False, indent=4)    
        
        return jsonify(outJson), 200
    except Exception as err:
        return jsonify({'error': err}), 500

@app.route('/fetch-results', methods=['POST'])
def fetchResults():
    try:
        request_file = request.get_json()
        data = request_file['data']
        result = extract_results(data)

        outJson = {
            **result
        }
        return jsonify(outJson), 200
    except Exception as err:
        return jsonify({'error': err}), 500

# @app.route('/save-results', methods=['POST'])
# def saveResults():    
#     try:
#         dir_path = os.path.abspath('')
#         request_file = request.get_json()
#         with open(dir_path +  '/output/results.json', 'w', encoding='utf-8') as f:
#             json.dump(request_file, f, ensure_ascii=False, indent=4)    
#         return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

    except Exception as err:
        return jsonify({'error': err}), 500

### ------ SPEECH TO TEXT METHODS ------ ###    

@app.route('/speech-to-text', methods=['GET', 'POST'])
def performTTS():
    request_file = request.get_json()
    filename = request_file['name']
    filedata = request_file['video']
    split_filedata = filedata.split(",")
    print("filename: ", filename, "\n")
    print("filedata: ", type(filedata), "\n")
    print("split_filedata: ", split_filedata[0], "\n")
    if filename[-3:] == 'mp4':
        wavfile = filename.rstrip("mp4") + "wav"
    else:
        wavfile = filename.rstrip("mp3") + "wav"
    print("wavfile: ", wavfile, "\n")

    videodata = split_filedata[1]
    if os.path.isfile(filename):
        os.remove(filename)
        print("Mp4 File deleted \n")

    if os.path.isfile(wavfile):
        os.remove(wavfile)
        print("Wav File deleted \n")
    
    videofile = open(filename, "wb")
    videofile.write(base64.b64decode(videodata))
    videofile.close()

    if filename != "": 
        output = run_vosk(filename)
        print("outputfile: ", filename)

    return jsonify({'result': output}), 200

    

if __name__ == '__main__':
    app.run(debug=True)