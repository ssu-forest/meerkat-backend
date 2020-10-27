import HttpException from '../exceptions/HttpException';
import * as db from '../lib/db';

class ViewsService {

  public async univView(param: Array<string>): Promise<any> {
    const sqlValue = param;
    const sql = `
      SELECT 
        idx,
        univ_name AS 'univName',
        univ_deparment AS 'univDeparment',
        county,
        department,
        nighttime_ck AS 'nighttimeCk',
        employment_ck AS 'employmentCk',
        double_major_ck 'doubleMajorCk',
        reg_date AS 'regDate',
        mod_date AS 'modDate',
        del_yn AS 'delYn'
      FROM universitylist.universitylist
      WHERE idx = ?`;

    let queryData = await db.query(sql, sqlValue);
    if(queryData.length == 0){
      throw new HttpException(602, '없는 정보를 조회했어요.');
    }

    queryData[0]['delYn']  = queryData[0]['delYn'] ? true : false ; // mysql bool은 0/1 로 리턴함에 따라 치환
    if(queryData[0]['delYn'] == true){ //관리자의 경우 그대로 정보를 전달하지만 관리자가 아님에 따라 결과 리턴
      throw new HttpException(602, '없는 정보를 조회했어요.2');
    }

    return queryData;
  }
  
}

export default ViewsService;
