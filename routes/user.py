from flask import Blueprint , jsonify

app = Blueprint('user' , __name__, url_prefix='')

@app.route('' , methods=['GET'])
def index():
    content = {'server': 'hi'}
    return content 