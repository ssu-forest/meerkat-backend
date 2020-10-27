import * as db from '../lib/db';
import {departmentCodeTrans , mapCodeTrans} from '../utils/util'

class IndexService {

  public async universityList(mapCode :any, departmentCode :any, weeklyCode :any): Promise<any> {
    //SQL 쿼리문 시작
    let sql = `
    SELECT 
      ul.idx,
      ul.univ_name AS "univName" , 
      ul.univ_deparment AS "univDeparment" , 
      cm.code_value AS "county" ,
      ul.department , 
      ul.image,
      ul.nighttime_ck AS "nighttimeCk",
      ul.employment_ck AS "employmentCk",
      ul.double_major_ck AS "doubleMajorCk",
      ul.reg_date AS "regDate",
      ul.mod_date AS "modDate",
      ul.del_yn AS "delYn"
    FROM universitylist ul
    JOIN (
      SELECT code_value , NAME FROM codemap
      WHERE code_id = "MAP_CODE"
    ) cm
    ON cm.name = ul.county
    WHERE 1=1`;

    if (mapCodeTrans(mapCode[0]) != "전체") { // 지역 데이터의 '전체'가 아니라면 이 데이터는 드랍.
      sql += " AND (county = ?";
      for (let numberCk = 0; numberCk < mapCode.length - 1; numberCk++) {
        sql += " OR county = ?";
      }
      sql += ")";
    }else{
      mapCode = [];
    }

    if (departmentCodeTrans(departmentCode[0]) != "전체") { // 지역 데이터의 '전체'가 아니라면 이 데이터는 드랍.
      sql += " AND (department = ?";
      for (let numberCk = 0; numberCk < departmentCode.length - 1; numberCk++) {
        sql += " OR department = ?";
      }
      sql += ")";
    }else{
      departmentCode = [];
    }
    
    if (weeklyCode != "전체") { // 지역 데이터의 '전체'가 아니라면 이 데이터는 드랍. 이미 치환된 상태로 전달.
      sql += " AND nighttime_ck = ?";
    }else{
      weeklyCode = [];
    }

    sql += " ORDER BY idx ASC";
    //SQL 쿼리문 종료

    const sqlValue = mapCode.concat(departmentCode).concat(weeklyCode);
    const queryData = await db.query(sql, sqlValue);
    
    return queryData;
  }
}

export default IndexService;
