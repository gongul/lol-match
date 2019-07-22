import {Router} from 'express';

const router = Router();

router.use('/begin-addinfo',(req,res,next) => {
    if(req.session == undefined || req.session.passport == undefined || req.session.passport.user.isAddInfo == true) return res.redirect(302,"/");

    return next();
});

router.use('/sucess-addinfo',(req,res,next) => {
    if(req.session == undefined || req.session.passport == undefined || req.session.passport.user.isAddInfo == true) return res.redirect(302,"/");

    return next();
});

router.use('/login',(req,res,next) => {
    if(req.session && req.session.passport) return res.redirect(302,"/");

    return next();
});


//세션이 있으면 접근하면 안됨.
router.use('/auth/kakao',(req,res,next) => {
    if(req.session && req.session.passport) return res.redirect(302,"/");
    console.log("router use")

    return next();
});

router.use('/auth/kakao/callback',(req,res,next) => {
    if(req.session && req.session.passport) return res.redirect(302,"/");

    return next();
});

export default router