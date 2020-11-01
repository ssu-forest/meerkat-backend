import { Router } from 'express';
import BoardController from '../controllers/board.controoler';
import Route from '../interfaces/routes.interface';

class BoardRoute implements Route {
  public path = '/board';
  public router = Router();
  public boardController = new BoardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:category`, this.boardController.boardList); //메인페이지
    this.router.get(`${this.path}/:category:/page`, this.boardController.boardList); //메인페이지
  }
}

export default BoardRoute;
