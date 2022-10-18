from sentence_transformers import SentenceTransformer
# from bertopic import BERTopic
from sklearn.feature_extraction.text import CountVectorizer
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForSeq2SeqLM
from wordcloud import WordCloud
from scipy.special import softmax
from keybert import KeyBERT
from keyphrase_vectorizers import KeyphraseCountVectorizer
from nltk.tokenize import sent_tokenize
import nltk
import numpy as np
import io, base64, os, random, json
import pdfplumber

dir_path = os.path.abspath('')

# extracts content from csv/txt in /data to an entire paragraph
def extract_text(filename, data):
    message = ""
    name, extension = os.path.splitext(filename)
    index = data.index(',')
    data_url = data[index+1:]
    decoded_text = base64.b64decode(data_url)
    print(decoded_text)
    try: 
        if extension == '.pdf':
            with open("output/text/text_{}".format(filename), "wb") as f:
                f.write(decoded_text)
            with pdfplumber.open("output/text/text_{}".format(filename)) as pdf:
                for page in pdf.pages:
                    message += page.extract_text() 
        else:
            message = decoded_text.decode('utf-8')
            # save message to txt file
        with open("output/text/text_{}".format(filename), "w") as f:
            f.write(message)
    except Exception as err:
            print(err, "occured in "+ filename)
    return message

# extract results from json
def extract_results(data):
    index = data.index(',')
    data_url = data[index+1:]
    try: 
        decoded_result = base64.b64decode(data_url).decode('utf-8')
        outJson = json.loads(decoded_result)
        return outJson
    except Exception as err:
        print(err)


def generate_summary(message):

    # Summarization model
    tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

    # encode text into tensor of integers
    inputs = tokenizer.encode("summarize:" + message, return_tensors="pt", max_length=1024, truncation=True)
    outputs = model.generate(
                    inputs, 
                    max_length=150, 
                    min_length=40, 
                    length_penalty=2.0, 
                    num_beams=4, 
                    early_stopping=True)
    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    returnJson = {"summary": summary}
    print(returnJson)
    return returnJson



def generate_sentiments(message):

    nltk.data.path.append(dir_path + '/models/nltk_data')

    # sentiment analysis model
    tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")
    model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")
    
    labels=['Negative', 'Neutral', 'Positive']

    sentences = sent_tokenize(message)
    
    scores_table = []
    sentimentJson = {"overall_score":{}, "overall_sentiment": "none", "sentiment_count":{}}
    sentiment_count = {"Negative": 0, "Neutral": 0, "Positive": 0}
    sentiment_by_sent = {}
    
    for index in range(len(sentences)):
        text = sentences[index]
        encoded_input = tokenizer(text, return_tensors='pt', max_length=510, truncation=True)
        output = model(**encoded_input)
        scores = output[0][0].detach().tolist()
        scores = softmax(scores)    # converts into probabilities

        best_score = np.round(np.max(scores), 4)
        scores_table.append(scores)
        pred_sentiment = labels[np.argmax(scores)]
        sentiment_by_sent[index] = {"text":text, "score":best_score, "sentiment":pred_sentiment}
        sentiment_count[pred_sentiment] += 1
    
    # calculate overall average sentiment       
    np_scores = np.asarray(scores_table)
    # print((np_scores))
    avg_sentiments = np.round(np.average(np_scores, axis=0), 4)
    for index in range(len(avg_sentiments)):
        sentiment = labels[index]
        sentimentJson["overall_score"][sentiment] = avg_sentiments[index]
    sentimentJson["overall_sentiment"] = labels[np.argmax(avg_sentiments)]
    sentimentJson["sentiment_count"] = sentiment_count
    sentimentJson["sentiment_distribution"] = sentiment_by_sent
    print(sentimentJson)
    return sentimentJson


def generate_topics(document):

    failBert = True
    global topics_words

    modelPath = dir_path + '/models/all-MiniLM-L6-v2' 
    sentence_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    vectorizer_model = CountVectorizer(stop_words="english")

    # OPTIMALLY RUN BERTOPIC
    # if (failBert == False):
    #     try:
    #         data = sent_tokenize(document)
    #         topic_model = BERTopic(calculate_probabilities=True,
    #                             diversity=0.2,
    #                             embedding_model=sentence_model,
    #                             vectorizer_model=vectorizer_model,
    #                             verbose=True)

    #         topics, probabilities = topic_model.fit_transform(data)
    #         topics_words = topic_model.get_topic(0)
    #         print("BerTopic:")
    #         if (topics_words == False):
    #             failBert = True
    #     except Exception as e:
    #         failBert = True
    #         print(e) 
        
    if (failBert):
        # KEYBERT ALTERNATIVE FOR SHORTER DOCUMENTS
        kw_model = KeyBERT(model=sentence_model)

        topics_words = kw_model.extract_keywords(document,
                                        # keyphrase_ngram_range=(1, 2),
                                        use_mmr=True,
                                        diversity=0.3,
                                        stop_words="english",
                                        # vectorizer=KeyphraseCountVectorizer(),
                                        vectorizer=KeyphraseCountVectorizer(pos_pattern='<N.*>'),
                                        top_n=8)
        print("Keybert:")

    # Altering data structure to pass to frontend 
    # wordlist = {}
    wordlist = []

    for word in topics_words:
        word_vis = {
            "value": word[0],
            "count": round(word[1]*100,3)
        }
        wordlist.append(word_vis)

    returnJson = {"topics": wordlist}
    return returnJson

def generate_word_cloud(message, filename):

    wc = WordCloud(background_color="white",  width=1600, height=800)
    wc.generate(message)
    imageRes = wc.to_image()

    # Save wordcloud locally to /output/wordcloud
    wc.to_file(dir_path + "/output/wordcloud/{}.png".format(filename))
    
    # Convert to bytestring 
    file_object = io.BytesIO()
    imageRes.save(file_object, format='PNG')
    bytestring = base64.b64encode(file_object.getvalue())
    returnJson = {"wordcloud": bytestring.decode('utf-8')}
    return returnJson


# extract text & export NLP results as JSON
def run_chatterbox(message):
    
    # Sentiment
    sentimentJson = generate_sentiments(message)
    # Summary
    summarizedJson = generate_summary(message)
    # Word Cloud
    wordcloudJson = generate_word_cloud(message)

    finalJson = {**sentimentJson, **summarizedJson, **wordcloudJson}
    
    return finalJson