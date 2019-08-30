import { Service } from "typedi";
import { getManager, Repository, ObjectLiteral, InsertResult, QueryFailedError } from "typeorm";
import UserEntity from "../../entity/user/user";
import { QueryError, NoDataError } from "../../error/express/error";
import MatchEntity from "../../entity/match/match";

@Service("matchService")
export class MatchServiceImpl{
    private repo!: Repository<MatchEntity>; 

    constructor(){this.repo = getManager().getRepository(MatchEntity);}

    async find(entity:MatchEntity):Promise<MatchEntity|undefined>{
        try{
            const data = await this.repo.findOne(entity);

            return data;
        }catch(e){
            const err = new QueryError("Match search failed");
           
            throw err;
        }
       
    }

    /**
    * 이메일 기준으로 매치 대기열 유저 찾는다.
    * 
    * 아래 방법으로도 되야 정상인거 같은데 작동 되지 않는다 확인 필요
    * 
    * const data = await this.repo.find({
    *           join: {
    *               alias: "match",
    *               innerJoinAndSelect: {
    *                   user: "match.user"
    *              }
    *           },
    *           where: {user:{email:'남자'}}
    *       });
    * @param email  user email
    * 
    */
    async findByEmail(email:string):Promise<MatchEntity|undefined>{
        try{
            const data = await this.repo.createQueryBuilder("match").
                            innerJoinAndSelect("match.user","user").where('user.email = :email',{email:email})
                            .getOne();

            return data;
        }catch(e){
            const err = new QueryError("Match search failed");
           
            throw err;
        }
       
    }


    /**
    * 매칭 알고리즘에 의해 듀오를 찾는다 
    * 
    * @param sex  성별
    * 
    */
   async findMatchDuo(sex:string):Promise<MatchEntity|undefined>{
        
        if(sex == "남자"){
            sex = "여자";
        }else{
            sex = "남자";
        }

        try{
            const data = await this.repo.createQueryBuilder("match").
                            innerJoinAndSelect("match.user","user").where('user.sex = :sex',{sex:sex})
                            .orderBy("match.idx","ASC")
                            .getOne();

            return data;
        }catch(e){
            console.log(e);
            const err = new QueryError("User search failed");
        
            throw err;
        }
    
    }

    /**
    * 이메일 기준으로 매치 대기열에 유저를 찾고 없다면 추가한다
    * 
    * @param email  user email
    * 
    */
    // async findByEmailEndSave(email:string,args:MatchEntity):Promise<MatchEntity>{
    //     try{
    //         const hasUser = await this.findByEmail(email);

    //         if(hasUser === undefined) throw new NoDataError("유저 데이터가 없습니다.");
            
    //         args.email = hasUser.email;
    //         const user = await this.save(args);

    //         return user;

    //     }catch(e){
    //         throw e;
    //     }
    // }

    /**
    * 유저를 매치 대기열(데이터베이스)에 삽입 한다.
    * 기존 데이터가 있을 시 업데이트 한다
    * 
    * @param entity  Match 클래스로 만들어진 객체
    * 
    */
    async save(entity:MatchEntity):Promise<MatchEntity>{
        try{
            const obj = await this.repo.save(entity);

            return obj;
        }catch(e){
            const err = new QueryError("Faild save user data");
           
            console.log(e);
            throw err;
        }
    }

    /**
    * 매치 대기열에서 제외한다
    * 
    * @param entity  Match 클래스로 만들어진 객체
    * 
    */
   async delete(entity:MatchEntity):Promise<void>{
        try{
            await this.repo.delete(entity);

        }catch(e){
            const err = new QueryError("Faild dalete user data");
        
            throw err;
        }
    }

    /**
    * 유저를 매치 대기열(데이터베이스)에 삽입 한다.
    * 중복 된 값이 있을 시 실패한다.
    * 
    * @param entity Match 클래스로 만들어진 객체
    * 
    */
    async insert(entity:MatchEntity):Promise<MatchEntity>{
        try{
            const obj = await this.repo.insert(entity);

            return entity;
        }catch(e){
            const err = new QueryError("Faild insert user data");
           
            throw err;
        }
    }
}
