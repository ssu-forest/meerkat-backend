# 🐾 Meerkat-Backend
새롭게 시작하는 Node 프로젝트

## 👏 기초 서버 설정하기 
🛎[주의] node가 설치되어 있어야합니다. 🛎

1. npm instll 하기
```
npm install
```

2. 파일명 .env를 폴더 루트에 생성하여 다음 내용을 붙여넣기
```
JWT_SECRET=asdqwe123
PORT=3000

DB_HOST=database-2.cddjwsaz53em.ap-northeast-2.rds.amazonaws.com
DB_USER=postgres
DB_PASSWORD=패스워드는 카톡에서 전달
DB_PORT=5432
DB_TABLE_NAME=postgres
```

3. 서비스 실행하기 
```
npm run dev -- dev (nodemon 적용버전) 둘중 하나 선택 가능
npm run start -- start
```

--------
## 서비스 구조 알아보기
