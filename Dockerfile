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

COPY . .

USER user

CMD python3 app.py