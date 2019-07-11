import { Inject } from "typedi";
import { Request,Response } from "express-serve-static-core";
import { NextFunction } from "connect";
import RsaToken from "../util/rsa-token";
import UserTokenService from "../service/user/user-token-service";
import UserToken from "../entity/user/user-token";

export default class Authentication{
    @Inject("userTokenService")
    private userTokenService!:UserTokenService<UserToken>;
    
    async socialLogin(req:Request, res:Response, next:NextFunction){
        const userAgent = req.headers['user-agent'];
        const {cookies} = req;

        if(req.session != undefined && req.session.passport != undefined) return next();
        if(cookies == undefined || cookies.uToken == undefined) return next();

        const info:any = new RsaToken().jwtDecoding(cookies.uToken);

        if(info.email == undefined) return next();

        const userToken = new UserToken();
        userToken.setData({Identifier:userAgent,email:info.email,token:cookies.uToken,expire:info.exp});

        const hasToken = await this.userTokenService.findOne(userToken);

        if(hasToken == undefined){
            res.clearCookie("uToken");

            return next();
        }

        console.log(hasToken);


        return next();
    }
}
