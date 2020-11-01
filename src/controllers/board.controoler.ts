import { NextFunction, Request, Response } from 'express';
import { PostgreSqlReturn } from '../interfaces/postgre.interface';
import { RequestWithUser } from '../interfaces/auth.interface';
import BoardService from '../services/board.service';
import HttpException from '../exceptions/HttpException';
import * as checkParam  from '../utils/custom_check_param';
import * as cRes from '../utils/custom_render';


class BoardController {
  
  public boardService = new BoardService();

  public boardView = async (req: Request, res: Response, next: NextFunction) => {
    const body : object = {
      id : req.params['id']
    };

    try {
      const data = await this.boardService.boardList(Object.values(body));
      cRes.sendJson(res, data[0]);      
    } catch (error) {
      next(error);
    }
  }

  public boardList = async (req: Request, res: Response, next: NextFunction) => {
    const category: string = req.params['category'] || 'free';
    try {
      const data: PostgreSqlReturn = await this.boardService.boardList([category]);
      cRes.sendJson(res, data.jsondata);
    } catch (error) {
      next(error);
    }
  }

  //boardWrite
  public boardWrite = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const body : object = {
      title : req.body['title'],
      content: req.body['content'],
      category: req.body['category'],
      userId : req.user.id
    };

    try {
      const data: PostgreSqlReturn = await this.boardService.boardWrite(Object.values(body));
      cRes.sendJson(res, data);
    } catch (error) {
      next(error);
    }
  }

  //boardModify
  public boardModify = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const body : object = {
      userId : req.user.id,
      boardId : req.params['boardId'],
      title : req.body['title'],
      content: req.body['content']
    };

    try {
      let data: PostgreSqlReturn = await this.boardService.boardModify(Object.values(body));
      data.message = 'modify Success';
      
      cRes.sendJson(res, data);
    } catch (error) {
      next(error);
    }
  }

  public boardDelete = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const body : object = {
      userId : req.user.id,
      boardId : req.params['boardId']
    };

    try {
      let data: PostgreSqlReturn = await this.boardService.boardModify(Object.values(body));
      data.message = 'Delete Success';

      cRes.sendJson(res, data);
    } catch (error) {
      next(error);
    }
  }


  
}

export default BoardController;
