import * as db from '../lib/db';

export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length;
};

export const isEmpty = (value : any) : boolean =>{
  if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){ 
    return true 
  }else{ 
    return false 
  } 
};

export const randomId = (): string => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( let i=0; i < 7; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

/**
 * mapCodeTrans
 * 맵 코드와 맵 이름을 매칭하여 반환해줍니다.
 * @param {*} number 
 */
export const mapCodeTrans = (mapId : number) =>{
  let retrunName = ["전체" , "서울" , "부산" , "대구" , "인천" , "광주" , "대전" , "울산" , "세종" , "경기" , "강원" , "충북" , "충남" , "전북" , "전남" , "경북" ,"경남" , "제주"]
  return retrunName[mapId];
};

/**
 * departmentCodeTrans
 * 대학코드와 이름을 매칭하여 반환해줍니다.
 * @param {*} number 
 */
export const departmentCodeTrans = (id : number) =>{
  //A0 //A1 로 잡히는데 이거 수정해야할듯?
  let retrunName = ["전체" , "공학" , "인문사회" , "자연과학" , "예체능"];
  return retrunName[id];
}
/**
 * departmentCodeTrans
 * 야간 주간을 조회해서 보여줍니다.
 * @param {*} number 
 */
export const weeklyCodeTrans = (id :string) => {
  let returnName = "";
  if (id === "B0") {
    returnName = "전체";
  } else if (id === "BY") {
    returnName = "Y";
  } else if (id === "BN") {
    returnName = "N";
  } else {
    returnName = "error";
  }
  return returnName;
}

/**
 * 리스트를 페이징 처리합니다.
 * @param totalPageCount 총 데이터 수
 * @param curPage 페이지 인덱스
 */
export const pagelist = (curPage : any , totalPageCount : any) => {
  //할당된 페이지 게시글 수 
  let page_size = 10;
          
  //보여줄 페이지 갯수 (1~10) 
  let page_list_size = 10;

  let no = 0;

  //전체 페이지 갯수
  if (totalPageCount < 0) {
    totalPageCount = 0
  }

  //현제 페이지
  if(!curPage || curPage == 0){
    curPage = 1;
  }

  // 전체 페이지수
  let totalPage = Math.ceil(totalPageCount / page_size);

  if(totalPage < curPage){
    curPage = totalPage;
  }
  let totalSet = Math.ceil(totalPage / page_list_size); //전체 세트수
  let curSet = Math.ceil(curPage / page_list_size) // 현재 셋트 번호
  let startPage = ((curSet - 1) * 10) + 1 //현재 세트내 출력될 시작 페이지
  let endPage = (startPage + page_list_size) - 1; //현재 세트내 출력될 마지막 페이지

  //현재페이지가 0 보다 작으면
  if (curPage < 0) {
    no = 0
  } else {
  //0보다 크면 limit 함수에 들어갈 첫번째 인자 값 구하기
    no = (curPage - 1) * 10
  }

  let pageSet = {
    "no" : no,
    "page_size" : page_size,
    "totalPage" : totalPage,
    "totalSet" : totalSet,
    "curSet" : curSet,
    "startPage" : startPage,
    "endPage" : endPage,
    "curPage" : curPage
  };

  return pageSet;
    
}

export const codeList = (code_id : any) => {
  return new Promise(async function (resolve, reject){
    let sql = ` 
      SELECT 
        idx, 
        code_id AS "codeId", 
        code_value AS "codeValue", 
        name 
      FROM codemap  
      WHERE code_id = ?
    `;
    let sqlValue = code_id;

    resolve(await db.query(sql, sqlValue));
  });
}




