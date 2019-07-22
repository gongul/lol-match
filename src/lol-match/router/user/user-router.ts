import { Inject } from 'typedi';
import User from '../../entity/user/user';
import Router from '../../config/express-router';
import { Router as ExpressRouter} from 'express';
import { UserResolve } from 'src/lol-match/resolve/user/user-resolve';

class UserController{
    public router:ExpressRouter = Router();

    @Inject("userService")
    private userService!:UserService<User>;

    constructor(){
        this.controller();
    }

    private controller():void{
        const _router = this.router;
        
        _router.get('/hello',(req,res,next) => {
            return res.json({message:"user root"})
        });

        _router.graph("/",UserResolve,
                {
                    graphiql: false,
                });
    }
}



export default UserController