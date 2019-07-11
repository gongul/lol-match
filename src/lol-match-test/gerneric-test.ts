import { UserServiceImpl } from "src/lol-match/service/user/user-service";
import Container from "typedi";
import UserEntity from "../lol-match/entity/user/user";
import { validate } from "class-validator";
import UserExtends from "./user-extends-entity";
import throwTest from "./error-test";
import { Authentication } from "../lol-match/interceptor/authentication";


export default async function testRun(app:any){
    const auth = Container.get(Authentication);

}
    


