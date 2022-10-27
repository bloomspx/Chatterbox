FROM python:3.9

ENV APP_HOME /app

ENV NUMBA_CACHE_DIR=/tmp/numba_cache

ENV SENTENCE_TRANSFORMERS_HOME=/home/cache

RUN pip install -U \
    pip \
    setuptools \
    wheel

WORKDIR $APP_HOME

RUN useradd -m -r user && \
    chown user /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

RUN python -c 'from transformers import AutoTokenizer; tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment"); tokenizer2 = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")'
RUN python -c 'from transformers import AutoModelForSequenceClassification; model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment");'
RUN python -c 'from transformers import AutoModelForSeq2SeqLM; model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn");'
RUN python -c 'from sentence_transformers import SentenceTransformer; sentence_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")'

COPY . .

USER user

CMD python3 app.py