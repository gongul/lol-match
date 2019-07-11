import user from "./router/user";
import etc from "./router/etc";
import {Passport} from "./router/passport";
import {Container} from "typedi";
import {Authentication} from "./authentication";

export default async function index(app:any){
    const auth = await Container.get(Authentication);
    console.log(auth);
    console.log("in auth");
    await Container.get(Passport);

    app.use(auth.socialLogin);
    app.use('/',etc);
    app.use('/user',user);
}