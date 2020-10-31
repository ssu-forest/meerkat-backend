import { NextFunction, Request, Response } from 'express';
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
      const data = await this.boardService.boardlist(Object.values(body));
      cRes.sendJson(res, data[0]);      
    } catch (error) {
      next(error);
    }
  }

  public boardList = async (req: Request, res: Response, next: NextFunction) => {
    const category: number = Number(req.params['category']) || 0

    console.log(category);

    try {
      const data = await this.boardService.boardlist([category]);

      console.log(data);
      cRes.sendJson(res, data.rows);      
    } catch (error) {
      next(error);
    }
  }

  
}

export default BoardController;
