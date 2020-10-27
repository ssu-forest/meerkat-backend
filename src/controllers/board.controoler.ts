import { NextFunction, Request, Response } from 'express';
import boardService from '../services/board.service';
import HttpException from '../exceptions/HttpException';
import * as checkParam  from '../utils/custom_check_param';
import * as cRes from '../utils/custom_render';

class BoardController {
  
  public boardService = new boardService();

  public univView = async (req: Request, res: Response, next: NextFunction) => {
    const paramCheckResult = checkParam.checkV2(req.params, [
      {
        key: "id",
        type: "int",
        required: true
      }
    ]);
    if (paramCheckResult != null) {
      cRes.sendErrorJson(res, 601 , paramCheckResult);
      return;
    }
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
  
}

export default BoardController;
