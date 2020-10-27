import { Router } from 'express';
import IndexController from '../controllers/index.controller';
import Route from '../interfaces/routes.interface';

class IndexRoute implements Route {
  public path = '';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.healthCheck);
    this.router.get(`${this.path}/main`, this.indexController.index); //메인페이지
  }
}

export default IndexRoute;
