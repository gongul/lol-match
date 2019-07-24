import express from 'express';
import graphqlHTTP from 'express-graphql';
import {buildSchema, ClassType, MiddlewareFn} from "type-graphql";
import { Container } from "typedi";
import passport from "passport";
import session from "express-session";
import {renderFile} from "ejs";
import AppRootPath from "app-root-path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { GraphQLError } from 'graphql';
import {Express} from "../../../type/express-core";

export default class App{
    private app:Express = express();

    private constructor(){
        const _app = this.app;

        _app.graph = async function(url : string,schemaClass : any,option : any){
            const schema = await buildSchema({
                resolvers: [schemaClass],
                container: Container,
                validate: true,
            });
        
            option['schema'] = schema;
            /*
                여기에 들어오는 에러는 resolve 기준으로 모든 에러가 들어오는데 에러를 커스텀할라고 하면
                 customValidateFn,customExecuteFn 완전 커스텀을 해야한다. 참고 https://github.com/graphql/express-graphql#options
            */
            option['customFormatErrorFn'] = (err:GraphQLError) => {
                return {
                    message: err.message,
                    locations: err.locations,
                    stack: err.stack ? err.stack.split('\n') : [],
                    path: err.path,
                }   
               
            }
           
        
            this.use(url,graphqlHTTP(option));
        }  

        _app.set('views', AppRootPath.path + '/resources/views');
        _app.set('view engine', 'ejs');
        _app.engine('html', renderFile);

        _app.use(bodyParser.json());
        _app.use(bodyParser.urlencoded({extended:false}));
        _app.use('/static',express.static(AppRootPath.path+'/resources/static'));
        _app.use(cookieParser())
        _app.use(session({
            secret: '@#@2$lol-match#@1$#$',
            resave: false,
            saveUninitialized: true,
            cookie:{maxAge: (60 * 1000 * 240)} // 4시간 
        }));
        _app.use(passport.initialize()); // passport 구동
        _app.use(passport.session());
    }

    public static bootstrap(serverPort:number){
        const express = new App();
        express.app.listen(serverPort);

        return express.app;
    }

}