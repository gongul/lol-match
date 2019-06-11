import {Router} from 'express';

const router = Router();

router.get('/',(req,res)=>{
    res.json({"a":"b"});
})

export default router