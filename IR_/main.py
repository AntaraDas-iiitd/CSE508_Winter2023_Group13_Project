from flask import Flask, render_template, request
import urllib.request
import imghdr
import base64
from model import Query_Processing, category_index, state_index, city_index, MainIndex

app = Flask(__name__, template_folder='templates')

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/error')
def error():
    return render_template('error.html')

@app.route('/results', methods=['POST'])
def results():
    if request.method == 'POST':
        query = request.form['query']
        s = Query_Processing()
        result = s.query_processor(query)
        if(result == 0):
            print("wehnaliugebhiuegbuisebwgeiugbfew")
            return render_template('home.html',error = "no data found")
        
        urls = []
        for imageUrls in result['imageUrls']:
            urls.append(imageUrls)
        image_srcs = []
        for url in urls:
            with urllib.request.urlopen(url) as url_response:
                image_data = url_response.read()
            file_type = imghdr.what(None, h=image_data)
            image_base64 = base64.b64encode(image_data).decode()
            image_src = f'data:image/{file_type};base64,{image_base64}'
            image_srcs.append(image_src)


        return render_template('results.html', image_srcs=image_srcs, results=result)



if __name__ == '__main__':
    app.run(debug=True)
