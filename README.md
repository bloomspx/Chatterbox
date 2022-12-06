<h1 align="center" style="border-bottom: none">
    <b>Chatterbox Documentation</b>
</h1>

<p align="center">
    A text-to-speech & text analysis tool built using Flask, React, HuggingFace and Vosk
</p>

<div align="center">

[![Npm package version](https://badgen.net/npm/v/express)](https://npmjs.com/package/express)
[![React](https://img.shields.io/badge/React-18.2-61dafb)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/node->=16.0-success)](https://www.typescriptlang.org/)
</div>

# Table of Contents
- [Setup](#setup)
- [Getting Started](#getting-started)
- [Documentation](#documentation)

# Setup
ChatterBox runs locally as a web application <br/>
Tested on Windows and Linux (Ubuntu 20.04 LTS)

### For Windows Setup
Download ffmpeg using : https://www.ffmpeg.org/download.html <br/><br/>
Ensure following softwares are download 
- Vscode
- Github Desktop
- Node.js
- Python >3.8

<br/>

### For Linux Setup

```
// install github desktop https://gist.github.com/berkorbay/6feda478a00b0432d13f1fc0a50467f1

sudo apt install git
sudo apt install python
sudo apt install ffmpeg
sudo snap install node --classic
```

<br/>

# Getting Started
### 1. Download HuggingFace models locally, and save it in backend/models

Download the `pytorch_model.bin` for each model and move each file to `backend/models`

backend/models/roberta-SA <br/>
https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment/tree/main

backend/models/bart-summary <br/>
https://huggingface.co/facebook/bart-large-cnn/tree/main

backend/models/all-MiniLM-L6-v2 <br/>
https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/tree/main

<br/>

### 2. Create virtual environment, install Python dependencies for Flask backend & run

```c
cd backend       
python -m venv .venv

// ensure (.venv) is showing in ur command prompt, else run this command in the parent directory
// (For Windows)
.venv\scripts\activate
// (For Linux)
source .venv/bin/activate

pip install -r requirements.txt 

// some modules may need to be individually pip installed, check for missing modules & pip install respective modules
// pytorch with gpu: https://pytorch.org/get-started/locally/

// run flask
python app.py 

flask run
```

<br/>

### 3. Install Node modules for React frontend & run
```
cd frontend      
npm install
npm start
```

<br/>

# Documentation  
Individual documentation can be found for the following components:
-  Creating Shellscript for ChatterBox Quickstart (For Linux) located in `/ubuntu bash launcher` folder
- Audio Processing (Vosk) located in `/References/Audio_Processing.md`
- Natural Language Processing (NLP) located in `/References/NLP.md`
- React Frontend located in `/References/React.md`
