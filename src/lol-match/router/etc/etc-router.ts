import {Router} from 'express';
import passport from "passport";
import { Container, Inject } from 'typedi';
import { InternalServerError, NoDataError } from '../../error/error';
import RsaToken from "../../util/rsa-token";
import UserToken from '../../entity/user/user-token';
import UserTokenService from "../../service/user/user-token-service";
import User from "../../entity/user/user";

class EtcController{
    public router:Router = Router();
    @Inject("userService")
    private userService!:UserService<User>;
    @Inject("userTokenService")
    private userTokenService!:UserTokenService<UserToken>;

    constructor(){
        this.controller();
    }

    private controller():void{
        const _router = this.router;
        _router.get('/login',(req,res,next) => {
            return res.render("begin-login",{
                name: "테스트"
            });
        });
        

        // 추가 정보 입력하는 로직 
        _router.post('/success-addinfo',async (req,res,next) => {
            let session:any = req.session;
            let sessionInfo:any = session.passport.user;

            const userAgent = req.headers['user-agent'];
            const {name,lolName,sex} = req.body;
            const {email,accessToken} = sessionInfo;

            let user:User = new User({name:name,lolName:lolName,sex:sex,isAddInfo:true});

             // 유저 추가 정보 입력
            try{   
                user = await this.userService.findByEmailEndSave(email,user);
            }catch(e){
                return next(e);
            }
            
            const exp = Math.floor(Date.now() / 1000) + 21600;  // 현재시간 + 6시간 후에 만료됨. 
            const jwtToken = new RsaToken().jwtEncoding({email:email,exp:exp});
            
            // 소셜 로그인 6시간 자동 소셜 유저 확인을 위한 토큰 저장 
            try{ 
                const userToken = new UserToken();
                userToken.setData({token:jwtToken,accessToken:accessToken,email,expire:exp,Identifier:userAgent});
                await this.userTokenService.insert(userToken);
            }catch(e){
                return next(e);
            }

            // 세션 정보 수정
            sessionInfo.name = user.name;
            sessionInfo.sex = user.sex;
            sessionInfo.lolName = user.lolName;
            sessionInfo.isAddInfo = user.isAddInfo;


            // 소셜 로그인 유지를 위한 쿠키 발급
            res.cookie('uToken', jwtToken, {path: '/',expires:new Date(exp*1000)});

            return res.send("success");
        });
        
        _router.get('/auth/kakao',
            passport.authenticate('kakao')
        );

        /* 바로 접근하는것도 막아야함 referer 체크하기 */
        _router.get('/auth/kakao/callback',(req,res,next) => {
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

    }
}

export default EtcController