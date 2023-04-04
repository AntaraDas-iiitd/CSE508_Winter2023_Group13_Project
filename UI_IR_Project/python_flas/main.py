from flask import Flask, render_template, request,redirect,jsonify
# from model import Query_Processing,MainIndex,city_index,state_index,category_index
import urllib.request
from urllib.error import HTTPError
import imghdr
import pandas as pd
import json
from flask_cors import CORS

import base64
from model import Query_Processing, category_index, state_index, city_index, MainIndex

app = Flask(__name__, template_folder='templates')
CORS(app, origins='http://localhost:3000')

@app.route('/api/data', methods=['GET'])
def get_data():
    query = request.args.get('query')
    print(query)
    # your Python code to generate the dataframe and filter based on the query
    # data = {'column1': [1, 2, 3], 'column2': [4, 5, 6], 'column3': [7, 8, 9]}
    # print(query)
    # if query:
    #     data = filter_data(data, query)
    # json_data = jsonify(data)

    df = pd.read_excel('Refined_dataset.xlsx')
    s = Query_Processing()
    result = s.query_processor(query)
    #print("asfd",type(result))
    #(result)
    data = result.to_dict(orient='records')
    json_data = json.dumps(data)
    return jsonify(data)

@app.route('/api/nearby_data', methods=['GET'])
def nearby_places(place_ID):
    # your Python code to filter the data based on the query
    return data

@app.route('/api/people_also_searchfor', methods=['GET'])
def people_alsosearch_for():
    # your Python code to filter the data based on the query
    
    return data


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
        print(result)
        if(len(result) == 0 or result.empty):
            print("wehnaliugebhiuegbuisebwgeiugbfew")
            #return render_template('home.html',error = "no data found")
            #return render_template('error.html')
            return redirect('/')
        
        urls = []
        for imageUrls in result['imageUrls']:
            urls.append(imageUrls)
        image_srcs = []
        for url in urls:
            try:
                print("url",url)
                with urllib.request.urlopen(url) as url_response:
                    image_data = url_response.read()
                file_type = imghdr.what(None, h=image_data)
                image_base64 = base64.b64encode(image_data).decode()
                image_src = f'data:image/{file_type};base64,{image_base64}'
                image_srcs.append(image_src)
            except HTTPError as e:
                if e.code == 403:
                    print("error")


        return render_template('results.html', image_srcs=image_srcs, results=result)



if __name__ == '__main__':
    app.run(debug=True)
  