import { Resolver,Query,Arg } from "type-graphql";
import User from "../../entity/user/user";
import { Inject } from "typedi";
import "../../service/user/user-service";

@Resolver(User)
export class UserResolve {
    @Inject("userService") private userService!:UserService<User>

    constructor() {}

    @Query(returns => User)
    user(@Arg("email") email: string) {
        const data: object|undefined = this.userService.findByEmail(email);
        
        return data;
    }
}