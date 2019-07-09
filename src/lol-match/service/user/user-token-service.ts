import { Service } from "typedi";
import { getManager, Repository, ObjectLiteral, InsertResult, QueryFailedError } from "typeorm";
import User from "../../entity/user/user";
import { QueryError } from "../../error/error";
import UserToken from "src/lol-match/entity/user/user-token";

@Service("userTokenService")
export default class UserTokenServiceImpl<T extends UserToken>{
    private repo!: Repository<UserToken>; 

    constructor(){this.repo = getManager().getRepository(UserToken);}


    /**
    * 유저 토큰를 데이터베이스에 삽입 한다.
    * 기존 데이터가 있을 시 업데이트 한다
    * 
    * @param entity  UserToken을 상속한 모든 객체
    * 
    */
    async save(entity:T):Promise<T>{
        try{
            const obj = await this.repo.save(entity);

            return obj;
        }catch(e){
            const err = new QueryError("Faild save user token");
           
            throw err;
        }
    }


    /**
    * 유저 토큰을 데이터베이스에 삽입 한다.
    * 중복 된 값이 있을 시 실패한다.
    * 
    * @param entity  UserToken을 상속한 모든 객체
    * 
    */
    async insert(entity:T):Promise<T>{
        try{
            const obj = await this.repo.insert(entity);

            return entity;
        }catch(e){
            const err = new QueryError("Faild insert user token");
           
            throw err;
        }
    }
}
