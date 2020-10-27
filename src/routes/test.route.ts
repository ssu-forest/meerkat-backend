import { Router } from 'express';
import testController from '../controllers/test.controller';
import Route from '../interfaces/routes.interface';

class testRoute implements Route {
  public path = '/test';
  public router = Router();
  public testController = new testController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.testController.index);
  }
}

export default testRoute;