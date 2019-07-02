import { Service } from "typedi";
import { getManager, Repository, ObjectLiteral } from "typeorm";
import User from "../../entity/user/user";

@Service("userService")
export class UserServiceImpl<T extends User> implements UserService<T>{
    private repo!: Repository<User>; 

    constructor(){this.repo = getManager().getRepository(User);}

    /**
    * 이메일 기준으로 유저를 찾는다.
    * 
    * @param email  user email
    */

    async findByEmail(email:string):Promise<User|undefined|Error>{
        const user:User = new User();
        
        user.email = email;

        try{
            const data = await this.repo.findOne(user);

            return data;
        }catch(e){
            return e;
        }
       
    }

     /**
    * 유저 디비 저장
    * 중복은 
    * 
    * @param entity  User를 상속한 모든 객체
    * 
    */
    save(entity:T):Promise<T|Error>{
        try{
            const obj = this.repo.save(entity);

            return obj;
        }catch(e){
            return e;
        }
    }
}
