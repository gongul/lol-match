import userRouter from './user/user-router';
import {UserResolve} from "../resolve/user/user-resolve";
import {buildSchema} from "type-graphql";
import graphqlHTTP from 'express-graphql';

export default async function index(app: any){
    userRouter(app);

    
    app.graph("/graphql",UserResolve,
                {
                    graphiql: false,
                })
}

