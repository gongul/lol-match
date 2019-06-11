import userRouter from './user/user-router';
import {UserResolve} from "../resolve/user/user-resolve";
import {buildSchema} from "type-graphql";
import graphqlHTTP from 'express-graphql';
import passport from "passport";
import "../test/passport";

export default async function index(app: any){
    userRouter(app);

    app.get('/',(req:any,res:any) =>{
        res.json({"msg":"done"});
    })

    app.graph("/graphql",UserResolve,
                {
                    graphiql: false,
                })

    app.get('/auth/kakao',
        passport.authenticate('kakao')
    );
    app.get('/auth/kakao/callback',
        passport.authenticate('kakao', {
            successRedirect: '/',
            failureRedirect: '/'
        })
)   ;
}

