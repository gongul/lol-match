import { Resolver,Query,Arg } from "type-graphql";
import User from "../../entity/user/user";
import { Inject } from "typedi";
import "../../service/user/user-service";
import Email from "../../entity/util/email";

@Resolver(User)
export class UserResolve {
    @Inject("userService") private userService!:UserService<User>

    constructor() {}

    // email validate작업 해야함
    @Query(returns => User)
    async findByEmail(@Arg("email") email: string) {
        const data: object|undefined = await this.userService.findByEmail(email);
        
        return data;
    }
}