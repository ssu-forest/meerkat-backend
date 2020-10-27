import { NextFunction, Request, Response } from 'express';
import viewsService from '../services/views.service';
import * as checkParam  from '../utils/custom_check_param';
import * as cRes from '../utils/custom_render';

class ViewsController {
  
  public viewsService = new viewsService();

  public univView = async (req: Request, res: Response, next: NextFunction) => {
    const body : object = {
      id : req.params['id']
    };

    try {
      const data = await this.viewsService.univView(Object.values(body));
      cRes.sendJson(res, data[0]);      
    } catch (error) {
      next(error);
    }
  }
  
}

export default ViewsController;
