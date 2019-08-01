import { Service } from "typedi";
import { getManager, Repository, ObjectLiteral, InsertResult, QueryFailedError } from "typeorm";
import User from "../../entity/user/user";
import { QueryError, NoDataError } from "../../error/express/error";

@Service("userService")
export class UserServiceImpl<T extends User> implements UserService<T>{
    private repo!: Repository<User>; 

    constructor(){this.repo = getManager().getRepository(User);}

    /**
    * 이메일 기준으로 유저를 찾는다.
    * 
    * @param email  user email
    * 
    */
    async findByEmail(email:string):Promise<User|undefined>{
        const user:User = new User();
        
        user.email = email;

        try{
            const data = await this.repo.findOne(user);

            return data;
        }catch(e){
            const err = new QueryError("User search failed");
           
            throw err;
        }
       
    }

    /**
    * 이메일 기준으로 유저를 찾고 인자 값을 추가하여 저장한다
    * 
    * @param email  user email
    * 
    */
    async findByEmailEndSave<T extends User>(email:string,args:T):Promise<User>{
        try{
            const hasUser = await this.findByEmail(email);

            if(hasUser === undefined) throw new NoDataError("유저 데이터가 없습니다.");
            
            args.email = hasUser.email;
            const user = await this.save(args);

            return user;

        }catch(e){
            throw e;
        }
    }

    /**
    * 유저를 데이터베이스에 삽입 한다.
    * 기존 데이터가 있을 시 업데이트 한다
    * 
    * @param entity  User를 상속한 모든 객체
    * 
    */
    async save<T extends User>(entity:T):Promise<T>{
        try{
            const obj = await this.repo.save(entity);

            return obj;
        }catch(e){
            const err = new QueryError("Faild save user data");
           
            throw err;
        }
    }


    /**
    * 유저를 데이터베이스에 삽입 한다.
    * 중복 된 값이 있을 시 실패한다.
    * 
    * @param entity  User를 상속한 모든 객체
    * 
    */
    async insert<T extends User>(entity:T):Promise<T>{
        try{
            const obj = await this.repo.insert(entity);

            return entity;
        }catch(e){
            const err = new QueryError("Faild insert user data");
           
            throw err;
        }
    }
}
