# user.py
from flask import Blueprint , jsonify, request

app = Blueprint('board' , __name__, url_prefix='')

## 기본 경로
@app.route('' , methods=['GET'])
def main2():
    return jsonify({'test' : 'test11'})

## 가변 경로 view
## http://127.0.0.1:3000/board/view/1
@app.route('/view/<idx>' , methods=['GET'])
def view(idx):
    result = {'page' : idx} 
    return result

##http://127.0.0.1:3000/board/view2/1
@app.route('/view2/<userName>' , methods=['GET']) # URL뒤에 <>을 이용해 가변 경로를 적는다
def hello_user(userName):
    return 'Hello, %s'%(userName)

@app.route('/data', methods=['POST'])
def postdata():
    jsondata = request.get_json()
    re_jsondata = jsondata.get('title')

    return {"test1": re_jsondata}