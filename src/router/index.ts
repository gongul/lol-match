import {UserResolve} from "../resolve/user/user-resolve";
import {buildSchema} from "type-graphql";
import graphqlHTTP from 'express-graphql';

import etcRouter from "./etc/etc-router";
import userRouter from "./user/user-router";

export default async function index(app: any){
    app.use('/user',userRouter);
    app.use('/',etcRouter);
    
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

