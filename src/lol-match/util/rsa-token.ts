import fs from "fs";
import * as jwt from "jsonwebtoken";
import AppRootPath from "app-root-path";

export default class RsaToken{
    private cert!:Buffer;
    private pcert!:Buffer;

    public constructor(){
        this.cert = fs.readFileSync(AppRootPath.path+"/resources/ssl/match_jwt_token");
        this.pcert = fs.readFileSync(AppRootPath.path+"/resources/ssl/match_jwt_token.pem");
    }

    jwtEncoding(body:object):string{
        const token = jwt.sign(body,this.cert,{algorithm:'RS256'})
        
        return token;
    }

    jwtDecoding(token:string):object{
        let info:object|string = jwt.verify(token,this.pcert);
        
        if(info instanceof Object){
           return info;
        }

        const objInfo = {'payload':info};

        return objInfo;   
    }
}