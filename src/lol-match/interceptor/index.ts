import user from "./router/user";
import etc from "./router/etc";
import {Passport} from "./router/passport";
import {Container} from "typedi";
import {Authentication} from "./authentication";
import { Request } from "express-serve-static-core";
import { Response } from "express-serve-static-core";
import { NextFunction } from "express-serve-static-core";

export default async function index(app:any){
    const auth = Container.get(Authentication);
    Container.get(Passport);

    app.use((req:Request,res:Response,next:NextFunction) => {
        const blackList = ['/auth/kakao','/auth/kakao/callback','/login'];
        const path = req.originalUrl.replace(/\?.*$/, '');
        
        if(blackList.indexOf(path) > -1) return next();
        
        return auth.socialLogin(req,res,next);
    });
    app.use('/',etc);
    app.use('/user',user);
}