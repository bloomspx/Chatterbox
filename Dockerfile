FROM python:3.9

ENV APP_HOME /app

ENV NUMBA_CACHE_DIR=/tmp/numba_cache

# ENV SENTENCE_TRANSFORMERS_HOME=/home/cache

RUN pip install -U \
    pip \
    setuptools \
    wheel

WORKDIR $APP_HOME

RUN useradd -m -r user && \
    chown user /app

COPY requirements.txt ./

RUN pip install -r requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

# RUN python3 -c 'from transformers import AutoTokenizer, AutoModelForSequenceClassification; tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment"); model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment"); tokenizer.save_pretrained("./models/roberta-SA"); model.save_pretrained("./models/roberta-SA")'
# RUN python3 -c 'from transformers import AutoTokenizer, AutoModelForSeq2SeqLM; tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn"); model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn"); tokenizer.save_pretrained("./models/bart-summary"); model.save_pretrained("./models/bart-summary")'

COPY . .

USER user

CMD python3 app.py