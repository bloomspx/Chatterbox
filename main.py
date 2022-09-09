from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/', methods=['GET'])
def test():
    return jsonify({'message':'Welcome to Flask!'})