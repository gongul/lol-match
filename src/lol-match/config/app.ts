import express from 'express';
import graphqlHTTP from 'express-graphql';
import {buildSchema, ClassType} from "type-graphql";
import { Container } from "typedi";
import {createConnection,ConnectionOptions} from "typeorm";
import passport from "passport";
import session from "express-session";
import {renderFile} from "ejs";
import { exception } from '../interceptor/exception';
import AppRootPath from "app-root-path";

export default class App{
    private app:any = express();

    private constructor(){
        const _app = this.app;

        _app.graph = async function(url : string,schemaClass : any,option : any){
            const schema = await buildSchema({
                resolvers: [schemaClass],
                container: Container
            });
        
            option['schema'] = schema;
        
            this.use(url,graphqlHTTP(option));
        }  

        _app.set('views', AppRootPath.path + '/resources/views');
        _app.set('view engine', 'ejs');
        _app.engine('html', renderFile);
        

        _app.listen(4000);

        _app.use(express.urlencoded({extended: false}));
        _app.use('/static',express.static(AppRootPath.path+'/resources/static'));
        _app.use(session({
            secret: '@#@2$lol-match#@1$#$',
            resave: false,
            saveUninitialized: true,
            cookie:{maxAge: (60 * 1000 * 30)}
        }));
        _app.use(passport.initialize()); // passport 구동
        _app.use(passport.session());
        _app.use(exception);
    }

    public static bootstrap(){
        const app = new App();
        return app.app;
    }

}