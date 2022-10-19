FROM python:3.9

ENV APP_HOME /app

WORKDIR $APP_HOME

COPY . ./

RUN pip install --upgrade pip

RUN pip install --user bertopic

RUN pip install --user -r requirements.txt

CMD python3 app.py