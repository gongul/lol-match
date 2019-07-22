import {UserResolve} from "../resolve/user/user-resolve";
import {buildSchema} from "type-graphql";
import graphqlHTTP from 'express-graphql';
import Container from "typedi";
import EtcController from "./etc/etc-router";
import UserController from "./user/user-router";

export default async function index(app: any){
    const etc = Container.get(EtcController);
    const user = Container.get(UserController);

    app.use('/user',user.router);
    app.use('/',etc.router);
    
    app.get('/',(req:any,res:any) =>{
        console.log("--req---");
        console.log(req.session);
        console.log();
        console.log();
        console.log();
        res.json({"msg":"done"});
    });


    app.graph("/graphql",UserResolve,
                {
                    graphiql: false,
                })

    
}

