import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import ViewsRoute from './routes/view.route';
import JoinRoute from './routes/join.route';


import testRoute from './routes/test.route';
import validateEnv from './utils/validateEnv';


validateEnv();

const app = new App([
  new ViewsRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new IndexRoute(),
  new JoinRoute(),

  // 프론트 개발용 테스트
  new testRoute(),
]);

app.listen();
