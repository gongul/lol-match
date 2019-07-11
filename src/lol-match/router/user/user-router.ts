import {Router} from 'express';
import { Inject } from 'typedi';
import User from '../../entity/user/user';

class UserController{
    public router:Router = Router();
    @Inject("userService")
    private userService!:UserService<User>;

    constructor(){
        this.controller();
    }

    private controller():void{
        const _router = this.router;
        
        _router.get('/',(req,res,next) => {
            return res.json({message:"user root"})
        });
        
    }
}



export default UserController