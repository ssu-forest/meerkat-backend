import * as express from 'express'
import HttpException from '../exceptions/HttpException';

export const sendErrorJson = (res : express.Response , code : number , message : string , errorCode : string = null) => {
  //throw new HttpException(code, message);
  res.status(code).json({"message" : message , "errorCode" : errorCode });
}

export const sendJson = (res : express.Response , data :  any) => {
  res.status(200).json(data);
}

