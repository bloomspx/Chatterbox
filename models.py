from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForSeq2SeqLM

def downloadModels():

    # sentiment analysis model
    tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")
    model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")
    tokenizer.save_pretrained("./models/roberta-SA")
    model.save_pretrained("./models/roberta-SA")

    # summary model
    tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
    model = AutoModelForSequenceClassification.from_pretrained("facebook/bart-large-cnn")
    tokenizer.save_pretrained("./models/bart-summary")
    model.save_pretrained("./models/bart-summary")

    # BERTopic model
    tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
    model = AutoModelForSequenceClassification.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
    tokenizer.save_pretrained("./models/all-MiniLM-L6-v2")
    model.save_pretrained("./models/all-MiniLM-L6-v2")
