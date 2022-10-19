FROM python:3.9

ENV APP_HOME /app

RUN pip install -U \
    pip \
    setuptools \
    wheel

WORKDIR $APP_HOME

RUN useradd -m -r user && \
    chown user /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

USER user

CMD python3 app.py