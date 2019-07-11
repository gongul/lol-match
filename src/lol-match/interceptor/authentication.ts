import { Inject } from "typedi";
import { Request,Response } from "express-serve-static-core";
import { NextFunction } from "connect";
import RsaToken from "../util/rsa-token";
import UserTokenService from "../service/user/user-token-service";
import UserToken from "../entity/user/user-token";
import User from "../entity/user/user";
import Axios from "axios";
import { InternalServerError } from "../error/error";

export class Authentication{
    @Inject("userTokenService")
    private userTokenService!:UserTokenService<UserToken>;

    @Inject("userService")
    private userService!:UserService<User>;
    
    constructor() {}

    /**
    *  세션이 종료되고 자동 유지 쿠키가 있을 시 해당 계정의 정보를 체크하고 새로운 세션을 준다.
    *  쿠키는 발급 부터 4시간 작동한다
    */
    async socialLogin(req:Request, res:Response, next:NextFunction){
        const url = "https://kapi.kakao.com/v1/user/access_token_info";
        const userAgent = req.headers['user-agent'];
        const {cookies} = req;

        // 소셜 로그인 세션이 있거나 소셜 로그인 자동 유지 쿠키가 없으면   
        if(req.session != undefined && req.session.passport != undefined) return next();
        if(cookies == undefined || cookies.uToken == undefined) return next();

        const info:any = new RsaToken().jwtDecoding(cookies.uToken);
        // 쿠키 값이 정상이 아닐 때 
        if(info.email == undefined) return endCookie(); 

        const u = new User({email:info.email});
        const userToken = new UserToken({Identifier:userAgent,token:cookies.uToken,expire:info.exp,email:[u]});

        const hasToken = await this.userTokenService.findOne(userToken);

        // 클라이언트가 보낸 쿠키랑 각종 식별자들이 매치되지 않을 때
        if(hasToken == undefined) return endCookie(); 

        const response = await Axios.get(url,{headers:{'Authorization': "bearer " + hasToken.accessToken}});
        
        if(response.status !== 200) return next();

        const user = await this.userService.findByEmail(info.email);

        return setSession();
       
        function endCookie(){
            res.clearCookie("uToken");
    
            return next();
        }

        function setSession(){
            if(req.session && user && hasToken){
                const sessionInfo = {id:user.id,email:user.email,name:user.name,
                    accessToken:hasToken.accessToken,isAddInfo:user.isAddInfo,
                    sex:user.sex,lolName:user.lolName};

                req.login(sessionInfo,(err) => {
                    if(err){
                        // const loginCustomError = new InternalServerError("세션 등록 중에 에러가 발생하였습니다.");
                        return next();
                    }

                    return next();
                });
            }
        }
    }

    
}
