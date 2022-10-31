FROM python:3.9

ENV APP_HOME /app

ENV NUMBA_CACHE_DIR=/tmp/numba_cache
# ENV SENTENCE_TRANSFORMERS_HOME=/home/cache

RUN pip install -U \
    pip \
    setuptools \
    wheel

WORKDIR $APP_HOME

COPY requirements.txt ./

RUN pip install -r requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

RUN python3 -c 'from transformers import AutoTokenizer, AutoModelForSequenceClassification; tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment"); model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment"); tokenizer.save_pretrained("./models/roberta-SA"); model.save_pretrained("./models/roberta-SA")'
RUN python3 -c 'from sentence_transformers import SentenceTransformer; model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2"); model.save("./models/all-MiniLM")'
# RUN python3 -c 'from transformers import AutoTokenizer, AutoModelForSeq2SeqLM; tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn"); model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn"); tokenizer.save_pretrained("./models/bart-summary"); model.save_pretrained("./models/bart-summary")'

COPY . .

RUN adduser -D dockuser && \
    chown dockuser:dockuser -R /app/


# RUN useradd -ms /bin/bash user 
# RUN chown user:user -R /app

# RUN useradd -m -r user && \
#     chown -R user: /app && \
#     chmod 777 /app

USER dockuser

CMD python3 app.py