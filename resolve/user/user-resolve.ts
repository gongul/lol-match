import { Resolver,Query,Arg } from "type-graphql";
import * as User from "../../entity/user/user";
// import UserServiceImpl from '../../service/user/user-service';
// import UserService from '../../interface/user-service';
import { Injection } from '../../decorator/injection';
@Resolver(User.User)
export class RecipeResolver {
    constructor() {}

    @Injection()
    private userService!:UserService;

    @Query(returns => User.User)
    user(@Arg("id") id: number) {
        const data: object|undefined = this.userService.findById(id);
        
        return data;
    }

}
