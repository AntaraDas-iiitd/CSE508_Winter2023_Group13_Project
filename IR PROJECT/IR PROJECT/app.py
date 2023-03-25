from flask import Flask, render_template, request, jsonify
import requests
# from bs4 import BeautifulSoup
import pickle
import Sum

# app = Flask(__name__)
app=Flask(__name__,template_folder='templates')
# model = pickle.load(open("cross_index.pkl","rb"))
#model
@app.route('/')
def index():
    return render_template('home.html')


@app.route('/results', methods=['POST'])
def results():
    if request.method == 'POST':
        query = request.form['query']
        print(query)
        s = Sum.sumClass
        result = s.doubleOfNumbers(int(query))
        return render_template('results.html', results=result)

# @app.route('/', methods=['POST'])
# def get_results():
#     query = request.form['query']
#     url = f'https://www.google.com/search?q={query}&source=lnms&tbm=isch'
#     headers = {'User-Agent': 'Mozilla/5.0'}
#     page = requests.get(url, headers=headers)
#     soup = BeautifulSoup(page.content, 'html.parser')
#     images = soup.find_all('img')
#     image_urls = [image['src'] for image in images]
#
#     # Extract the title from the first result
#     results = soup.find_all('div', class_='r')
#     title = results[0].find('h3').text
#
#     return render_template('home.html', title=title, image_url=image_urls[0])

if __name__ == '__main__':
    app.run(debug=True)
