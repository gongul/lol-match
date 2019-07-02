import {Router} from 'express';
import passport from "passport";
import { Container } from 'typedi';
import { InternalServerError } from '../../error/error';

const router = Router();

router.get('/login',(req,res,next) => {
    res.send({"a":"a"});
});
router.get('/auth/kakao',
    passport.authenticate('kakao')
);
router.get('/auth/kakao/callback',(req,res,next) => {
    const userService:UserService<User> = Container.get("userService");

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

export default router