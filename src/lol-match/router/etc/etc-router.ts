import {Router} from 'express';
import passport from "passport";
import { Container } from 'typedi';
import { InternalServerError, NoDataError } from '../../error/error';
import RsaToken from "../../util/rsa-token";
import UserToken from '../../entity/user/user-token';
import UserTokenService from "../../service/user/user-token-service";
import User from "../../entity/user/user";

const router = Router();

class EtcController{
    static router(){
        const userService:UserService<User> = Container.get("userService");
        const userTokenService:UserTokenService<UserToken> = Container.get("userService");

        router.get('/login',(req,res,next) => {
            return res.render("begin-login",{
                name: "테스트"
            });
        });
        
        router.post('/success-addinfo',async (req,res,next) => {
            let session!:Express.Session;
            let user:User;

            const userAgent = req.headers['user-agent'];
            const {name,lolName,sex} = req.body;
            const {email,accessToken} = session.passport;
            
             // 유저 추가 정보 입력
            try{   
                user = await userService.findByEmailEndSave(email,
                        {name:name,lolName:lolName,sex:sex,isAddInfo:true});
            }catch(e){
                return next(e);
            }
            
            const exp = Math.floor(Date.now() / 1000) + 21600;  // 현재시간 + 6시간 후에 만료됨. 
            const jwtToken = new RsaToken().jwtEncoding({email:email,exp:exp});
            
            // 소셜 로그인 6시간 자동 소셜 유저 확인을 위한 토큰 저장 
            try{ 
                const userToken = new UserToken();
                userToken.setData({token:jwtToken,accessToken:accessToken,email,expire:exp,Identifier:userAgent});
                await userTokenService.insert(userToken);
            }catch(e){
                return next(e);
            }


            // 세션 정보 수정
            session.passport.name = user.name;
            session.passport.sex = user.sex;
            session.passport.lolName = user.lolName;
            session.isAddInfo = user.isAddInfo;


            // 소셜 로그인 유지를 위한 쿠키 발급
            res.cookie('uToken', jwtToken, {path: '/'});

            return res.send("success");
        });
        
        router.get('/auth/kakao',
            passport.authenticate('kakao')
        );

        router.get('/auth/kakao/callback',(req,res,next) => {
            passport.authenticate('kakao',(err,user,info) => {
                if(err) return next(err);
                if (!user) { return res.redirect('/login'); }
        
                req.login(user,(loginErr) => {
                    if(loginErr){
                        const loginCustomError = new InternalServerError("세션 등록 중에 에러가 발생하였습니다.");
                        return next(loginCustomError);
                    }

                    
                    return res.render("begin-login",{
                        name: user.name
                    });
                });
        
                
            })(req,res,next);
        });

        return router;
    }
}

export default EtcController