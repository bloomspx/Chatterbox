from cgitb import text
import urllib.request,sys,time
from bs4 import BeautifulSoup
import pandas as pd
import requests

def extract_content(url):
    try:
        page=requests.get(url) 
    except Exception as e:    
        error_type, error_obj, error_info = sys.exc_info()      
        print ('ERROR FOR LINK:',url)                     
        print (error_type, 'Line:', error_info.tb_lineno)

    time.sleep(2)
    soup = BeautifulSoup(page.text, "html.parser")


    ## extract article content
    textContent = soup.find_all('div', attrs={'class':'text'})
    paragraphs = []

    for i in textContent:
        para = i.find_all('p')
        for j in para:
            content = j.getText().strip()
            paragraphs.append(content)

    df = pd.DataFrame(paragraphs)
    df.to_csv("data/news.csv")




## CNA sample article urls
url = "https://www.channelnewsasia.com/sustainability/scientists-discover-how-air-pollution-triggers-lung-cancer-2931111"
# url = "https://www.channelnewsasia.com/asia/indonesia-subsidised-fuel-price-increase-micro-businesses-2929006"
# url = "https://cnaluxury.channelnewsasia.com/people/chye-seng-huat-hardware-leon-foo-morning-coffee-machine-206531"

message = extract_content(url)