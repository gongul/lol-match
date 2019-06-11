import {Router} from 'express';

const router = Router();

router.use('/login',(req,res,next) => {
    if(req.session && req.session.passport){
        res.redirect(301,"/");

        return next();
    } 

    next();
});

export default router