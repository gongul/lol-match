import user from "./router/user";
import etc from "./router/etc";
import {Passport} from "./router/passport";
import {Container} from "typedi";
import Authentication from "./authentication";

export default function index(app:any){
    const auth = Container.get(Authentication);
    Container.get(Passport);

    app.use(auth.socialLogin);
    app.use('/',etc);
    app.use('/user',user);
}