import {Router} from 'express';

const router = Router();

router.use('/sucess-addinfo',(req,res,next) => {
    if(req.session == undefined || req.session.passport == undefined || req.session.passport.user.isAddInfo) res.redirect(301,"/");
});

router.use('/login',(req,res,next) => {
    if(req.session && req.session.passport){
        res.redirect(301,"/");

        return next();
    } 

    next();
});

export default router