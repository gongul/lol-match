import user from "./router/user";
import etc from "./router/etc";
import {Passport} from "./router/passport";
import {Container} from "typedi";

export default function index(app:any){
    app.use('/',etc);
    app.use('/user',user);
    

    const passport = Container.get(Passport);
}