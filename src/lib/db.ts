import * as mysql from 'mysql2';
 
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  connectionLimit : 20,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: Number(process.env.PORT),
  database: process.env.BATABASE,
  multipleStatements : true //다중쿼리 설정가능하도록
});

pool.on('connection', function (connection :any) {
  console.log('커넥트를 돌려줍니다. (다 씀)')
});

pool.on('enqueue', function () {
  console.log('모든 커넥트를 다 썼어요.');
});

class DbService{

  public query(sql : string , valuse: Array<any> = []) : Promise<any>{
    return new Promise (function (resolve, reject){
      pool.getConnection(function(err : Error, connect : any) {
        if (err){ throw reject(err); }
        connect.query(sql, valuse, (err: Error, results: Array<Object>) => {
          if (err){ throw reject(err); }
          resolve(results);
        });
        connect.release();
      });
    })
  }  
}

export default DbService;