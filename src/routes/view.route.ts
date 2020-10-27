import { Router } from 'express';
import * as dto from '../dtos/view.dto';
import ViewsController from '../controllers/views.controller';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class ViewRoute implements Route {
  public path = '/view';
  public router = Router();
  public viewsController = new ViewsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, validationMiddleware(dto.GetView),this.viewsController.univView); // 대학 상세 정보 페이지 보기 
  }
}

export default ViewRoute;
