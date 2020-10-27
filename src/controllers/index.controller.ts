import { NextFunction, Request, Response } from 'express';
import {departmentCodeTrans , weeklyCodeTrans } from '../utils/util';
import indexService from '../services/index.service';
import HttpException from '../exceptions/HttpException';
import * as checkParam  from '../utils/custom_check_param';
import * as cRes from '../utils/custom_render';
import { createWriteStream } from 'fs';



class IndexController {
  
  public indexService = new indexService();

  public healthCheck = async (req: Request, res: Response, next: NextFunction) => {
    try { 
      res.json({status : 200});
    } catch (error) {
      next(error);
    }
  }

  /**
   * index
   * 메인화면을 관리하는 API 입니다. 기본적인 학교정보, MAP 데이터를 보내줍니다.
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      cRes.sendJson(res, {"test" : "안녕하세요!"});
    } catch (error) {
      next(error);
    }
  }

  public test1 = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.headers);
      cRes.sendJson(res, {"test" : "안녕하세요!"});
    } catch (error) {
      next(error);
    }
  }
}

export default IndexController;
