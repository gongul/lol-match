import {Router} from 'express';

const router = Router();

router.use('/sucess-addinfo',(req,res,next) => {
    if(req.session == undefined || req.session.passport == undefined || req.session.passport.user.isAddInfo == true) return res.redirect(301,"/");

    return next();
});

router.use('/login',(req,res,next) => {
    if(req.session && req.session.passport)return res.redirect(301,"/");

    return next();
});

export default router