import { Router } from 'express';
import BoardController from '../controllers/board.controoler';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';

class BoardRoute implements Route {
  public path = '/board';
  public router = Router();
  public boardController = new BoardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:category`, this.boardController.boardList); //보드 정보
    this.router.get(`${this.path}/:category:/page`, this.boardController.boardList); //
    this.router.post(`${this.path}/write`, authMiddleware,  this.boardController.boardWrite); //
    this.router.post(`${this.path}/modify/:boardId`, authMiddleware,  this.boardController.boardModify); //
    this.router.post(`${this.path}/delete/:boardId`, authMiddleware,  this.boardController.boardDelete); //boardDelete
  }
}

export default BoardRoute;
