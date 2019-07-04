import {Router} from 'express';
import Container from 'typedi';

const router = Router();

class UserController{
    static router(){
        const userService:UserService<User> = Container.get("userService");
        
        router.get('/',(req,res)=>{
            res.json({"a":"b"});
        })

        return router
    }
}



export default UserController