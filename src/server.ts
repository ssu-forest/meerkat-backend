import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import ViewsRoute from './routes/view.route';
import JoinRoute from './routes/join.route';
import BoardRoute from './routes/board.route';
import CommentRoute from './routes/comment.route';
import validateEnv from './utils/validateEnv';



validateEnv();

const app = new App([
  new ViewsRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new BoardRoute(),
  new CommentRoute(),
  new IndexRoute(),
  new JoinRoute()
]);

app.listen();
