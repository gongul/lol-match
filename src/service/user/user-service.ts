import { Service } from "typedi";
import { getManager, Repository, ObjectLiteral } from "typeorm";
import User from "../../entity/user/user";

@Service("userService")
export class UserServiceImpl<T extends User> implements UserService<T>{
    private repo!: Repository<User>; 

    constructor(){this.repo = getManager().getRepository(User);}

    async findById(id:number):Promise<User|undefined|Error>{
        const user:User = new User();
        
        user.id = id;

        try{
            const data = await this.repo.findOne(user);

            return data;
        }catch(e){
            return e;
        }
       
    }

    save(entity:T):Promise<T|Error>{
        try{
            const obj = this.repo.save(entity);

            return obj;
        }catch(e){
            return e;
        }
    }
}
