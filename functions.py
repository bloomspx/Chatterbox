import csv

# extracts content from csv/txt in /data to an entire paragraph
def extract_text(filename):
    message = ""
    if (filename[-4:]) == ".csv":   # csv format
        with open("data/{}".format(filename), 'r', encoding="utf8") as f:
            reader = csv.reader(f)
            next(reader, None)  # skip headers
            for row in reader:
                # print(row)    
                message += "".join(row)
            # print(sentences)
    elif (filename[-4:] == ".txt"):     # txt format
        with open("data/{}".format(filename), 'r',  encoding="utf8") as f:
            message = "".join(f.readlines())
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
    
# summarize text
def summarize(summarizer, chunks):
    result = ""
    for i in chunks:
        summarized = summarizer(i, max_length=70, min_length=30, do_sample=False)
        # print(summarized[0]["summary_text"])
        result += summarized[0]["summary_text"]
    # print(result)
    return result

def generate_summary(summarizer, filename):
    message = extract_text(filename)
    sentences = message.split('.')
    chunks = form_text_chunks(sentences, 1024)
    # print("chunks:", chunks)
    result = summarize(summarizer, chunks)
    # print(result + "\n")
    while (len(result) > 1200):
        sentences = message.split('.')
        chunks = form_text_chunks(sentences, 1024)
        result = summarize(summarizer, chunks)
    print(result)
    return result
