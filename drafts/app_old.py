from flask import Flask, jsonify, render_template, request, make_response
import transformers
from transformers import AutoTokenizer, AutoModelForSequenceClassification

app = Flask(__name__)

model = "siebert/sentiment-roberta-large-english"
models = {"RoBERTa" : transformers.pipeline("sentiment-analysis", model=model)}
listOfKeys = []
for key in models:
    listOfKeys.append(key)

def get_prediction(message, model):
    results = model(message)
    return results

@app.route('/', methods=['GET'])
def display_models():
    return render_template("home.html", len = len(listOfKeys), listOfKeys = listOfKeys)


@app.route('/', methods=['POST'])
def predict():
    message = request.form['message']
    # choice of the model
    results = get_prediction(message, models[request.form.get("model_choice")])
    print(f'User selected model : {request.form.get("model_choice")}')
    my_prediction = f'The feeling of this text is {results[0]["label"]} with probability of {results[0]["score"]*100}%.'
    return render_template('result.html', text = f'{message}', prediction = my_prediction)

if __name__ == '__main__':
    app.run(debug=True)