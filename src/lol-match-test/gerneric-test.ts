import { UserServiceImpl } from "src/lol-match/service/user/user-service";
import Container from "typedi";
import UserExtends from "./user-extends-entity";
import { validate } from "class-validator";


export default async () =>{
    const service:UserService<UserExtends> = Container.get("userService");

    const a = new UserExtends();

    a.id = 23123123;
    a.name = "test";
    a.sex = "남성";
    a.email = "testEmai1l@naver.com";
    a.field = "testField";

    const isValid = await validate(a);

    console.log(isValid);

    try{
        const result = await service.insert(a);
        console.log(result);
    }catch(e){
        console.log("err");
        console.log(e);
    }
    

   
    console.log("----");
    console.log(a);
}
    


