from flask import Flask, render_template, request, redirect, jsonify, send_file, Response
from nlp import generate_sentiments, generate_summary, generate_topics, generate_word_cloud, extract_text, extract_results
from main_vosk import run_vosk
from flask_cors import CORS
from nltk.tokenize import sent_tokenize, word_tokenize
import requests, os, time, sys, base64, nltk, json

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "Chatterbox Flask server is currently running."

@app.route('/test-fetch', methods=['GET'])
def testFetch():
    try:
        outJson = {'success': "Test-fetch is working"}
        response = jsonify(outJson)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 200
    except Exception as err:
        response = err.get_response()
        # replace the body with JSON
        response.data = json.dumps({
            "code": err.code,
            "name": err.name,
            "description": err.description,
        })
        response.content_type = "application/json"
        return response

### ------ TEXT ANALYSIS METHODS ------ ###

@app.route('/topic-modelling', methods=['GET', 'POST'])
def performTM():
    try:
        request_file = request.get_json()
        text = request_file['text']

        topicJson = generate_topics(text)
        print("TOPICJSON FINAL:", topicJson)

        response = jsonify(topicJson)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 200
    except Exception as err:
        response = err.get_response()
        # replace the body with JSON
        response.data = json.dumps({
            "code": err.code,
            "name": err.name,
            "description": err.description,
        })
        response.content_type = "application/json"
        return response

@app.route('/sentiment-analysis', methods=['GET', 'POST'])
def performSA():
    try:
        request_file = request.get_json()
        text = request_file['text']
        sentimentJson = generate_sentiments(text)         
        response = jsonify(sentimentJson)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 200
    except Exception as err:
        response = err.get_response()
        # replace the body with JSON
        response.data = json.dumps({
            "code": err.code,
            "name": err.name,
            "description": err.description,
        })
        response.content_type = "application/json"
        return response

@app.route('/word-cloud', methods=['GET', 'POST'])
def performWC():
    try:
        request_file = request.get_json()
        text = request_file['text']
        wordcloudJson = generate_word_cloud(text)         
        response = jsonify(wordcloudJson)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 200
    except Exception as err:
        response = err.get_response()
        # replace the body with JSON
        response.data = json.dumps({
            "code": err.code,
            "name": err.name,
            "description": err.description,
        })
        response.content_type = "application/json"
        return response

# @app.route('/summary', methods=['GET', 'POST'])
# def performSummary():
#     try:
#         request_file = request.get_json()
#         filename = request_file['name']
#         data = request_file['data']
#         text = extract_text(filename, data)
#         sentimentJson = generate_sentiments(text) 
        
#         response = jsonify(sentimentJson)
#         # response.headers.add('Access-Control-Allow-Origin', '*')
#         return response, 200
#     except Exception as err:
#         response = err.get_response()
#         # replace the body with JSON
#         response.data = json.dumps({
#             "code": err.code,
#             "name": err.name,
#             "description": err.description,
#         })
#         response.content_type = "application/json"
#         return response

@app.route('/extract-text', methods=['GET', 'POST'])
def performET():
    try:
        dir_path = os.path.abspath('')
        nltk.data.path.append(dir_path + '/models/nltk_data')
        request_file = request.get_json()
        filename = request_file['name']
        data = request_file['data']
        text = extract_text(filename, data)

        num_sent = len(sent_tokenize(text))
        num_words = len(word_tokenize(text))

        # sentimentJson = generate_sentiments(text)
        # summarizedJson = generate_summary(text)
        # topicJson = generate_topics(text)
        # wordcloudJson = generate_word_cloud(text, filename)

        outJson = {
            'filename':filename,
            'text':text,
            'sentcount':num_sent, 
            'wordcount':num_words,
            # **summarizedJson,
            # **sentimentJson,
            # **topicJson,
            # **wordcloudJson
        }
        
        response = jsonify(outJson)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 200
    except Exception as err:
        response = err.get_response()
        # replace the body with JSON
        response.data = json.dumps({
            "code": err.code,
            "name": err.name,
            "description": err.description,
        })
        response.content_type = "application/json"
        return response

@app.route('/fetch-results', methods=['GET', 'POST'])
def fetchResults():
    try:
        request_file = request.get_json()
        data = request_file['data']
        result = extract_results(data)

        outJson = { **result }
        
        response = jsonify(outJson)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 200
    except Exception as err:
        response = err.get_response()
        # replace the body with JSON
        response.data = json.dumps({
            "code": err.code,
            "name": err.name,
            "description": err.description,
        })
        response.content_type = "application/json"
        return response

### ------ SPEECH TO TEXT METHODS ------ ###    

@app.route('/speech-to-text', methods=['GET', 'POST'])
def performTTS():
    try:
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

        outJson =  {'result': output}

        response = jsonify(outJson)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 200
    except Exception as err:
        response = err.get_response()
        # replace the body with JSON
        response.data = json.dumps({
            "code": err.code,
            "name": err.name,
            "description": err.description,
        })
        response.content_type = "application/json"
        return response

    

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)