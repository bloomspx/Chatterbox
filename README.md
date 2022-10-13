<h1 align="center" style="border-bottom: none">
    <b>ChatterBox Documentation</b>
</h1>

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

Download the `pytorch_model.bin` for each model and move to backend/models

backend/models/roberta-SA <br/>
https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment/tree/main

backend/models/bart-summary <br/>
https://huggingface.co/facebook/bart-large-cnn/tree/main

backend/models/all-MiniLM-L6-v2 <br/>
https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/tree/main

<br/>

### 2. Create virtual environment, install Python dependencies for Flask backend & run

```
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

# (Optional - For Linux) Creating shellscript for ChatterBox Quickstart
### Follow documentation in 'ubuntu bash launcher' folder