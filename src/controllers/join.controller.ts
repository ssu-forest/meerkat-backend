import { NextFunction, Request, Response } from 'express';
import joinService from '../services/join.service';
import AuthService from '../services/auth.service';
import { JoinUser } from '../interfaces/join.interface';
import { User } from '../interfaces/users.interface';
import { PostgreSqlReturn } from '../interfaces/postgre.interface';
import { CreateUserDto , FindUserIdDto , FindUserNameDto } from '../dtos/join.dto';
import * as cRes from '../utils/custom_render';
import * as bcrypt from 'bcrypt';

class JoinController {  
  public joinService = new joinService();
  public authService = new AuthService();

  /**
   * userJoin
   * 회원가입을 합니다
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  public userJoin = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;
    
    try {
      const data: PostgreSqlReturn = await this.joinService.findUserEmail([userData.email]);
      if(data.rowCount > 0){
        cRes.sendErrorJson(res, 601 , '이미 사용중인 이메일입니다.' , 'U001');
        return;
      }
      
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const obejctData = {
        email : userData.email,
        password :  hashedPassword
      };

      const userJoinData: PostgreSqlReturn = await this.joinService.joinUser(Object.values(obejctData));    
      const tokenData = this.authService.createToken(userJoinData.rows[0]);
      const cookie = this.authService.createCookie(tokenData);

      res.setHeader('Set-Cookie', [cookie]);
      cRes.sendJson(res, { data: userJoinData.rows[0], message: 'login' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * findUserEmail
   * 이미 사용중인 이메일인지 조회합니다.
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  public findUserEmail = async (req: Request, res: Response, next: NextFunction) => {

    const userData: FindUserIdDto = req.body;

    try {
      const data: PostgreSqlReturn = await this.joinService.findUserEmail(Object.values(userData));
      if(data.rowCount > 0){
        cRes.sendErrorJson(res, 601 , '이미 사용중인 이메일입니다.' , 'U001');
        return;
      }

      cRes.sendJson(res, {});
    } catch (error) {
      next(error);
    }
  }

  /**
   * findUserNickName
   * 사용중인 닉네임이 있는지 조회합니다.
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  public findUserNickName = async (req: Request, res: Response, next: NextFunction) => {
    const userData: FindUserNameDto = req.body;

    try {
      const data: Array<any> = await this.joinService.findUserNickName(Object.values(userData));
      if(data.length > 0){
        cRes.sendErrorJson(res, 602 , '이미 사용중인 닉네임 입니다.');
        return;
      }

      cRes.sendJson(res, {});      
    } catch (error) {
      next(error);
    }
  }


}

export default JoinController;
