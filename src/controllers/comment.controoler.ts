import { NextFunction, Request, Response } from 'express';
import { PostgreSqlReturn } from '../interfaces/postgre.interface';
import { RequestWithUser } from '../interfaces/auth.interface';
import CommentService from '../services/comment.service'
import HttpException from '../exceptions/HttpException';
import * as checkParam  from '../utils/custom_check_param';
import * as cRes from '../utils/custom_render';


class CommentController {
  
  public commentService = new CommentService();


  //boardWrite
  public commentWrite = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const body : object = {
      boardId: req.body['boardId'],
      userId : req.user.id,
      comment : req.body['comment']
    };

    try {
      const data: PostgreSqlReturn = await this.commentService.commentWrite(Object.values(body));

      console.log("-0-----[--");
      console.log(data);

      cRes.sendJson(res, {});
    } catch (error) {
      next(error);
    }
  };  
}

export default CommentController;
