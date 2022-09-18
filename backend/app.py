from flask import Flask, render_template, request, redirect, jsonify
from transformers import pipeline
from bs4 import BeautifulSoup
from nlp import run_chatterbox, generate_sentiments, generate_summary, generate_word_cloud
from utils import extract_text
from flask_cors import CORS
import pandas as pd
import requests, os, time, sys

app = Flask(__name__)
cors = CORS(app)

## hugging face models used
nlp = pipeline("sentiment-analysis", model="siebert/sentiment-roberta-large-english", tokenizer="siebert/sentiment-roberta-large-english")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")


@app.route('/', methods=['GET'])
def home():
    return "Flask server is currently running on localhost:5000."

@app.route('/save-file', methods=['POST'])
def saveFile():
    request_file = request.get_json()
    print(request_file)
    filename = request_file['name']
    filedata = request_file['text']


    if filename != "":
        text_file = open("data/temp.txt", "w", encoding='utf-8')
        n = text_file.write(filedata)
        text_file.close()
    try:
        text = extract_text(filename)
        num_words = len(text.split(' '))
        num_sent = len(text.split('.'))
        requestJson = {"text": text}

        print("Total wordcount:", num_words)
        print("Total sentences:", num_sent)
        return jsonify({'result': requestJson}), 200
    except Exception as err:
        return jsonify({'error': err}), 500

@app.route('/summary', methods=['GET'])
def summarize():
    try:
        with open("data/temp.txt", "r", encoding='utf-8') as f:
            lines = f.readlines()
            resultJson = {'text':"".join(lines)}
            result = generate_sentiments(resultJson)
            return jsonify({'summary': result}), 200
    except Exception as err:
        return 500

@app.route('/sentiment-analysis', methods=['GET'])
def sentimentanalysis():
    try:
        with open("data/temp.txt", "r", encoding='utf-8') as f:
            lines = f.readlines()
            resultJson = {'text':"".join(lines)}
            result = generate_summary(resultJson)
            return jsonify({'sa': result}), 200
    except Exception as err:
        return 500

@app.route('/wordcloud', methods=['GET'])
def wordcloud():
    try:
        with open("data/temp.txt", "r", encoding='utf-8') as f:
            lines = f.readlines()
            resultJson = {'text':"".join(lines)}
            result = generate_word_cloud(resultJson)
            return jsonify({'wordcloud': result}), 200
    except Exception as err:
        return 500




@app.route('/text-analysis', methods=['POST'])
def performTA():
    
    request_file = request.get_json()
    print(request_file)
    filename = request_file['name']
    filedata = request_file['text']


    if filename != "":
        text_file = open("data/temp.txt", "w", encoding='utf-8')
        n = text_file.write(filedata)
        text_file.close()
    try:
        result = run_chatterbox("temp.txt")
        return jsonify({'result': result}), 200
    except Exception as err:
        return jsonify({'error': err}), 500

@app.route('/text-to-speech', methods=['GET', 'POST'])
def performTTS():
    ### TODO
    return
    

if __name__ == '__main__':
    app.run(debug=True)