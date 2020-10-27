import { NextFunction, Request, Response } from 'express';

class testController {

  // www.dev.pinclass.com:3000/test
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ./views/test/main
      res.render('./test/main');
    } catch (error) {
      next(error);
    }
  }

}

export default testController;
