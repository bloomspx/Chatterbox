import sys,time,csv
from bs4 import BeautifulSoup, UnicodeDammit
import os
import pdfplumber


# extracts content from csv/txt in /data to an entire paragraph
def extract_text(filename):
    message = ""
    name, extension = os.path.splitext(filename)
    try: 
        if extension == ".csv":   # csv format
            with open("data/{}".format(filename), 'r', encoding="utf8") as f:
                reader = csv.reader(f)
                next(reader, None)  # skip headers
                for row in reader:
                    # print(row)    
                    message += "".join(row)
                # print(sentences)
        elif extension == ".txt":     # txt format
            with open("data/{}".format(filename), 'rb') as f:
                byteString = f.read()
                dammit = UnicodeDammit(byteString, ["utf-8",  "ascii"])
                encoding = dammit.original_encoding
                print("Encoding Type:", encoding)
                message = byteString.decode(encoding, errors='ignore')
                # print(message)
            
        elif extension == '.pdf':
            with pdfplumber.open("data/{}".format(filename)) as pdf:
                for page in pdf.pages:
                    message += page.extract_text() 
    except Exception as err:
            print(err, "occured in"+filename)
    message = message.replace('\n|\\x92"|\\x93|\\x94', ' ') # replace common unicode chars
    return message

# split text > max_length into a list of sentences
def form_text_chunks(document, max_length):
    chunks = []
    sent = ""
    length = 0
    for sentence in document:
        # print(sentence + "\n")
        sentence +=  "."
        length += len(sentence)
        if length < max_length:
            sent += sentence
        else:
            # print(sent + "\n\n")
            chunks.append(sent)
            sent = ""
            length = 0
    if sent:
        chunks.append(sent)
    return chunks