import { Router } from 'express';
import CommentController from '../controllers/comment.controoler';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';

class BoardRoute implements Route {
  public path = '/comment';
  public router = Router();
  public commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/write`, authMiddleware,  this.commentController.commentWrite); //댓글 작성하기
  }
}

export default BoardRoute;
