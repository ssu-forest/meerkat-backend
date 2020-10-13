from flask import Blueprint , jsonify

app = Blueprint('main' , __name__, url_prefix='')

@app.route('' , methods=['GET'])
@app.route('/index' , methods=['GET'])
def index():
    content = {'server': 'hello~ SSU FOREST'}
    return content 