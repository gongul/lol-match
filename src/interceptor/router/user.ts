import {Router} from 'express';

const router = Router();

router.use('/',(req,res,next) => {
    return next();
});

export default router