import { Router } from 'express';
import * as multer from 'multer';
import BoardController from '../controllers/board.controoler';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 } 
});


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

    this.router.post(`${this.path}/upload`, authMiddleware, upload.array('image' , 4), this.boardController.boardImgUpload); //이미지 등록
  }
}

export default BoardRoute;
