from flask import Flask, render_template, request, redirect
from transformers import pipeline
from bs4 import BeautifulSoup
from backend.utils import generate_summary, extract_text, generate_sentiments
import pandas as pd
import requests, os, time, sys

app = Flask(__name__)

## hugging face models used
nlp = pipeline("sentiment-analysis", model="siebert/sentiment-roberta-large-english", tokenizer="siebert/sentiment-roberta-large-english")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")


@app.route('/', methods=['GET'])
def home():
    return render_template("home.html")

@app.route('/convert', methods=['GET'])
def render_convert():
    return render_template("convert.html")

@app.route('/convert', methods=['POST'])
def convert():
    # extract article content from url
    try:
        url = request.form.get('url')
        print(url)
        page=requests.get(url) 
    except Exception as e:    
        error_type, error_info = sys.exc_info()      
        print ('ERROR FOR LINK:',url)                     
        print (error_type, 'Line:', error_info.tb_lineno)

    time.sleep(4)
    soup = BeautifulSoup(page.text, "html.parser")

    textContent = soup.find_all('div', attrs={'class':'text'})
    paragraphs = []

    for i in textContent:
        para = i.find_all('p')
        for j in para:
            content = j.getText().strip()
            paragraphs.append(content)

    df = pd.DataFrame(paragraphs)
    df.to_csv("data/news.csv", index=False)
    message = extract_text("news.csv")
    # obtain sa + summary 
    sa_results = generate_sentiments(message, nlp)
    summarized_text = generate_summary(summarizer, message)

    return render_template('result.html', summary = summarized_text, text=message, prediction=sa_results)


@app.route('/predict', methods=['GET'])
def render_predict():
    return render_template("predict.html")


@app.route('/predict', methods=['POST'])
def predict():
    # save file locally
    file_data = request.files['file']
    filename = file_data.filename
    if filename != "":
        file_data.save(os.path.join('data', filename))
    message = extract_text(filename)    # extract text & combine into 1 para

    # obtain sa prediction results
    sa_results = generate_sentiments(message, nlp)

    # obtain summary results
    summarized_text = generate_summary(summarizer, message)

    return render_template('result.html', summary = summarized_text, text=message, prediction=sa_results)

if __name__ == '__main__':
    app.run(debug=True)