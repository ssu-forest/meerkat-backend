import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import dbService from '../lib/db';

class BoardService {

  public async boardlist(param: Array<string>): Promise<any> {
    const sqlValue = param;
    const sql = `
      SELECT 
        id 
      FROM USER 
      WHERE id = ?`;

    const db = new dbService();
    const queryData = await db.query(sql, sqlValue);
    if(queryData.length == 0){
      throw new HttpException(602, '없는 대학 정보를 조회했어요.');
    }

    queryData[0]['delYn']  = queryData[0]['delYn'] ? true : false ; // mysql bool은 0/1 로 리턴함에 따라 치환
    if(queryData[0]['delYn'] == true){ //관리자의 경우 그대로 정보를 전달하지만 관리자가 아님에 따라 결과 리턴
      throw new HttpException(602, '없는 대학 정보를 조회했어요.2');
    }

    return queryData;
  }

}

export default BoardService;
