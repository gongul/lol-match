import { Resolver,Query,Arg, Mutation, Ctx } from "type-graphql";
import UserEntity from "../../entity/user/user";
import { Inject } from "typedi";
import "../../service/user/user-service";
import Email from "../../entity/util/email";
import UserInput from "../../entity/user/user-input";

@Resolver(UserEntity)
export class UserResolve {
    @Inject("userService") private userService!:UserService<UserEntity>

    constructor() {}

    // email validate작업 해야함
    @Query(returns => UserEntity,{nullable:true})
    async findByEmail(@Arg("email") email: string) {
        try{
            const data: User|undefined = await this.userService.findByEmail(email);
        
            return data;
        }catch(e){
            throw e;

        }
       
    }
    
    @Mutation(returns => UserEntity)
    async insert(@Arg("data") user: UserInput){
        try{
            const data: User = await this.userService.insert(user);

            return data;
        }catch(e){
            throw e;
        }
    
    }
}