from flask import Flask, jsonify, render_template, request, make_response
from transformers import pipeline
from html_to_csv import extract_content
import pandas as pd

app = Flask(__name__)

model = "siebert/sentiment-roberta-large-english"

models = {"RoBERTa" : pipeline("sentiment-analysis", model=model)}
listOfKeys = []
for key in models:
    listOfKeys.append(key)

def get_prediction(df, model):
    texts = df[df.columns[1]].to_list()

    new_df = pd.DataFrame(columns=["Content","Label", "Score"])

    for index in range(len(texts)):
        preds = model(texts[index])
        pred_sentiment = preds[0]["label"]
        pred_score = preds[0]["score"]

        # write data into df
        new_df.at[index, "Label"] = pred_sentiment
        new_df.at[index, "Score"] = pred_score
        # write text
        new_df.at[index, "Content"] = texts[index]

    new_df.to_csv("data/results.csv", index=False)
    results = new_df
    return results

@app.route('/', methods=['GET'])
def display_models():
    return render_template("home.html", len = len(listOfKeys), listOfKeys = listOfKeys)


@app.route('/', methods=['POST'])
def predict():
    file_name = request.form.get("filename")
    data = pd.read_csv('data/{}.csv'.format(file_name))
    df = pd.DataFrame(data)
    message = "\n".join(df[df.columns[1]].to_list())

    # choice of the model
    results = get_prediction(df, models[request.form.get("model_choice")])
    print(f'User selected model : {request.form.get("model_choice")}')
    return render_template('result.html', text = f'{message}', prediction = results)

if __name__ == '__main__':
    app.run(debug=True)