import Container from "typedi";
import UserEntity from "../lol-match/entity/user/user";


export default async function throwTest(){
    const _userService:UserService<User> = Container.get("userService");
    const user = new UserEntity();
    user.id = 4444;
    user.name = "a"
    user.email = "e@m.com"

    try{
        await _userService.insert(user);
    
        throw new Error("test error");
    }catch(e){
        throw e;
    }

    return "2";
    
}