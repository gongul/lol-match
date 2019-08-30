import UserEntity from "../lol-match/entity/user/user";
import { validate } from "class-validator";

(async() => {
    const user = new UserEntity();
    user.id = 4444;
    user.name = "a"
    user.email = "em.com"

    const r= await validate(user);
    
    console.log(r);
})()