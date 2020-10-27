import * as pg from 'pg';

const config = {
  user: String(process.env.DB_USER), 
  database: String(process.env.DB_TABLE_NAME),
  password: String(process.env.DB_PASSWORD), 
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT), //env var: PGPORT
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 20000, // how long a client 
};

const pool = new pg.Pool(config);


class DbService{

  public query(sql : string , valuse: any) : Promise<any>{
    return new Promise (function (resolve, reject){
      pool.connect(function(err : Error, connect : any, release:any) {
        if (err){ reject(err); }
        connect.query(sql, valuse, (err: Error, results: Array<Object>) => {
          if (err){ reject(err); }
          resolve(results);
        });
        release();
      });
    })
  }  
}

export default DbService;