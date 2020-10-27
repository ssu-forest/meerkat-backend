import { Router } from 'express';
import JoinController from '../controllers/join.controller';
import * as dto from '../dtos/join.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class JoinRoute implements Route {
  public path = '/join';
  public router = Router();
  public joinController = new JoinController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/user`, validationMiddleware(dto.CreateUserDto) , this.joinController.userJoin); // 회원가입
    this.router.post(`${this.path}/user/find-id`, validationMiddleware(dto.FindUserIdDto) , this.joinController.findUserId); // 아이디 조회
  }
}

export default JoinRoute;
