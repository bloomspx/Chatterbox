from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from wordcloud import WordCloud
from matplotlib import pyplot as plt
from scipy.special import softmax
import numpy as np
import io, base64

from utils import extract_text, form_text_chunks

# extract text & export NLP results as JSON
def run_chatterbox(filename):
    text = extract_text(filename)
    num_words = len(text.split(' '))
    num_sent = len(text.split('.'))
    requestJson = {"text": text}

    print("Total wordcount:", num_words)
    print("Total sentences:", num_sent)
    
    # Sentiment
    sentimentJson = generate_sentiments(requestJson)
    # Summary
    summarizedJson = generate_summary(requestJson)
    # Word Cloud
    wordcloudJson = generate_word_cloud(requestJson)

    finalJson = {**sentimentJson, **summarizedJson, **wordcloudJson}
    
    return finalJson


# summarizes entire paragraph and exports as JSON
def summarize(summarizer, chunks):
    result = ""
    for i in chunks:
        summarized = summarizer(i, max_length=70, min_length=30, do_sample=False)
        # print(summarized[0]["summary_text"])
        result += summarized[0]["summary_text"]
    # print(result)
    return result

def generate_summary(messageJson):
    # Summarization model
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn", tokenizer="facebook/bart-large-cnn")
    message = messageJson["text"]
    sentences = message.split('.')
    chunks = form_text_chunks(sentences, 1024)
    # print("chunks:", chunks)
    summary = summarize(summarizer, chunks)
    # print(result + "\n")
    while (len(summary) > 1200):
        sentences = summary.split('.')
        chunks = form_text_chunks(sentences, 1024)
        summary = summarize(summarizer, chunks)
    print(summary)
    returnJson = {"summary": summary}
    return returnJson



def generate_sentiments(messageJson):
    # sentiment analysis model
    model = "cardiffnlp/twitter-roberta-base-sentiment"
    tokenizer = AutoTokenizer.from_pretrained(model)
    model = AutoModelForSequenceClassification.from_pretrained(model)
    
    labels=['negative', 'neutral', 'positive']

    message = messageJson["text"]
    texts = message.split('.')
    chunks = form_text_chunks(texts, 512)
    
    scores_table = []
    sentimentJson = {"overall_score":{}, "overall_sentiment": "none", "sentiment_count":{}}
    sentiment_count = {"negative": 0, "neutral": 0, "positive": 0}
    for index in range(len(chunks)):
        text = chunks[index]
        encoded_input = tokenizer(text, return_tensors='pt')
        output = model(**encoded_input)
        scores = output[0][0].detach().tolist()
        scores = softmax(scores)    # converts into probabilities
        
        scores_table.append(scores)
        pred_sentiment = labels[np.argmax(scores)]
        sentiment_count[pred_sentiment] += 1
        # print(sentiment_count)

        
    # calculate overall average sentiment       
    np_scores = np.asarray(scores_table)
    # print((np_scores))
    avg_sentiments = np.round(np.average(np_scores, axis=0), 4)
    for index in range(len(avg_sentiments)):
        sentiment = labels[index]
        sentimentJson["overall_score"][sentiment] = avg_sentiments[index]
    sentimentJson["overall_sentiment"] = labels[np.argmax(avg_sentiments)]
    sentimentJson["sentiment_count"] = sentiment_count
    print(sentimentJson)
    return sentimentJson


def generate_word_cloud(messageJson):
    message = messageJson["text"]

    wc = WordCloud(background_color="white")
    wc.generate(message)
    imageRes = wc.to_image()
    
    # display wordcloud
    # plt.figure()
    # plt.imshow(wc)
    # plt.axis("off")
    # plt.show()
    
    # Convert to bytestring 
    file_object = io.BytesIO()
    imageRes.save(file_object, format='PNG')
    bytestring = base64.b64encode(file_object.getvalue())
    returnJson = {"wordcloud": bytestring.decode('utf-8')}
    print(returnJson)
    return returnJson
