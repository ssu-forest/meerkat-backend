import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';

function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  //const cookies = req.cookies;
  const authorization = req.get('Authorization');

  if (authorization) {
    const secret = process.env.JWT_SECRET;

    try {
      const verificationResponse = jwt.verify(authorization, secret) as DataStoredInToken;
      req.user = {
        id : verificationResponse.id, 
        email : verificationResponse.email, 
        state : verificationResponse.state
      };
      next();
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  } else {
    next(new HttpException(404, 'Authentication token missing'));
  }
}

export default authMiddleware;
