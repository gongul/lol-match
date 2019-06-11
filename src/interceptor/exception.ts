import { Request, Response } from "express-serve-static-core";
import { NextFunction } from "express-serve-static-core";
import {ErrorFrame} from "../error/error";

const exception = (err:Error, req:Request, res:Response, next:NextFunction)  => {
    if(err instanceof ErrorFrame){
        return res.status(err.statusCode).json({ message: err.message, status : err.statusCode });
    }
   
    
    /* 해당 부분 고유 HASH값 생성 및 에러 기록 남겨야함 */
    res.status(500).json({message:"Unknown error Please contact the administrator.",status:500});
}


export {exception}
  