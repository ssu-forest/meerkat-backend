# app.py
from flask import Flask
from routes import board , main, user
#import psycopg2
#from psycopg2.extras import RealDictCursor


#try:
#    conn = psycopg2.connect(host=HOST, dbname=DBNAME, user=USER, password=PWD)
#    cur = conn.cursor(cursor_factory=RealDictCursor)
#except Exception:
#    print('Fail to connect DB')

app=Flask(__name__)

## 메인 routes
app.register_blueprint(main.app, url_prefix="/")
## 게시판 routes
app.register_blueprint(board.app, url_prefix="/board")

app.register_blueprint(user.app, url_prefix="/user")

## 서버 실제 실행
if __name__ == "__main__":
    app.run(debug=True, port=3000)