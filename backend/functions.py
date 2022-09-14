import sys,time,csv
from bs4 import BeautifulSoup
import requests
import pandas as pd


# extracts content from csv/txt in /data to an entire paragraph
def extract_text(filename):
    message = ""
    if (filename[-4:]) == ".csv":   # csv format
        with open("data/{}".format(filename), 'r', encoding="utf8") as f:
            reader = csv.reader(f)
            next(reader, None)  # skip headers
            for row in reader:
                # print(row)    
                message += "".join(row)
            # print(sentences)
    elif (filename[-4:] == ".txt"):     # txt format
        with open("data/{}".format(filename), 'r',  encoding="utf8") as f:
            message = "".join(f.readlines())
    return message

# split text > max_length into a list of sentences
def form_text_chunks(document, max_length):
    chunks = []
    sent = ""
    length = 0
    for sentence in document:
        # print(sentence + "\n")
        sentence +=  "."
        length += len(sentence)
        if length < max_length:
            sent += sentence
        else:
            # print(sent + "\n\n")
            chunks.append(sent)
            sent = ""
            length = 0
    if sent:
        chunks.append(sent)
    return chunks
    
# summarize text
def summarize(summarizer, chunks):
    result = ""
    for i in chunks:
        summarized = summarizer(i, max_length=70, min_length=30, do_sample=False)
        # print(summarized[0]["summary_text"])
        result += summarized[0]["summary_text"]
    # print(result)
    return result

def generate_summary(summarizer, message):
    sentences = message.split('.')
    chunks = form_text_chunks(sentences, 1024)
    # print("chunks:", chunks)
    result = summarize(summarizer, chunks)
    # print(result + "\n")
    if (len(result) > 1200):
        sentences = result.split('.')
        chunks = form_text_chunks(sentences, 1024)
        result = summarize(summarizer, chunks)
    print(result)
    return result


def generate_sentiments(message, model):
    texts = message.split('.')
    # print(texts, "\n\n")
    chunks = form_text_chunks(texts, 512)
    new_df = pd.DataFrame(columns=["Content","Sentiment", "Score"])

    for index in range(len(chunks)):
        preds = model(chunks[index])
        # print(preds)
        pred_sentiment = preds[0]["label"]
        pred_score = preds[0]["score"]

        # write predicted data into df
        new_df.at[index, "Sentiment"] = pred_sentiment
        new_df.at[index, "Score"] = pred_score
        # write text
        new_df.at[index, "Content"] = "".join((chunks[index]))

    # new_df.to_csv("data/results.csv", index=False)
    new_df.to_json("data/results.json")
    results = new_df
    return results
