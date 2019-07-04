import {Router} from 'express';
import passport from "passport";
import { Container } from 'typedi';
import { InternalServerError, NoDataError } from '../../error/error';

const router = Router();


class EtcController{
    static router(){
        const userService:UserService<User> = Container.get("userService");

        router.get('/login',(req,res,next) => {
            return res.render("begin-login",{
                name: "테스트"
            });
        });
        
        router.use('/sucess-addinfo',(req,res,next) => {
            if(req.session == undefined) res.redirect(301,"/");
        })
        
        router.post('/success-addinfo',async (req,res,next) => {
            let session!:Express.Session;
            
            if(req.session != undefined && req.session.passport != undefined) session = req.session;
        
            try{
                const user:User|undefined = await userService.findByEmail(session.passport.email);

                if(!user) return next(new NoDataError("유저 데이터가 없습니다."));

                user.name = req.body.name;
                user.sex = req.body.sex;

                await userService.save(user);

                session.passport.name = user.name;
                session.passport.sex = user.sex;
            }catch(e){
                return next(e);
            }
            
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