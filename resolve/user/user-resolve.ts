import { Resolver,Query,Arg } from "type-graphql";
import * as User from "../../entity/user/user";
import { Inject } from "typedi";
import "../../service/user/user-service";

@Resolver(User.User)
export class UserResolve {
    constructor(@Inject("userService") private userService:UserService) {}

    @Query(returns => User.User)
    user(@Arg("id") id: number) {
        const data: object|undefined = this.userService.findById(id);
        
        return data;
    }
}