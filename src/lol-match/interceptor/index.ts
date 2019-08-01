import user from "./router/user";
import etc from "./router/etc";
import {Passport} from "./passport";
import {Container} from "typedi";
import {Authentication} from "./authentication";
import { Request } from "express-serve-static-core";
import { Response } from "express-serve-static-core";
import { NextFunction } from "express-serve-static-core";

export default async function index(app:any){
    const auth = Container.get(Authentication);
    Container.get(Passport);

    // app.use(auth.socialLogin) 사용 시 this에 접근할 수 없다(userService)
    app.use((req:Request,res:Response,next:NextFunction) => {
        return auth.socialLogin(req,res,next);
    });
    app.use('/',etc);
    app.use('/user',user);
}