import { Resolver,Query,Arg } from "type-graphql";
import * as User from "../../entity/user/user";
import fakeDatabase from '../../database/fakedatabase';
import UserService from '../../service/user';

@Resolver(User.User)
@CustomResolver()
export class RecipeResolver {
    constructor() {}

    @injection()
    private userService!:UserService;

    @Query(returns => User.User)
    user(@Arg("id") id: number) {
        // const recipe =  this.recipeService.findById(id);
        // if (recipe === undefined) {
        //     throw new RecipeNotFoundError(id);
        // }
        // return recipe;


        const data: object|undefined = fakeDatabase.find((elem:any) => {
            return elem.id == id;
        });
        
        return data;
    }

}

// const resolvers = {
//   Query: {
//       user(_, { id }) {
//           const data: string = Object.keys(fakeDatabase).find((value) => {
//               if (fakeDatabase[value].id == id) {
//                   return true;
//               }
//           });
          
//           return fakeDatabase[data];
//       },
//       allUser() {
//           return fakeDatabase;
//       }
//   }
// };