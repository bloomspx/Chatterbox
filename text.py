import pandas as pd

def predict():
    file_name = "news"
    data = pd.read_csv('data/{}.csv'.format(file_name))
    df = pd.DataFrame(data)
    message = "\n".join(df[df.columns[1]].to_list())

    print(message)


predict()
