import "reflect-metadata";
import express from 'express';
import graphqlHTTP from 'express-graphql';
import router from './lol-match/router';
import {buildSchema, ClassType} from "type-graphql";
import { Container } from "typedi";
import {createConnection,ConnectionOptions} from "typeorm";
import passport from "passport";
import session from "express-session";
import interceptor from "./lol-match/interceptor";
import {renderFile} from "ejs";

async function run(){
    await createConnection()

    const app = express();

    app.set('views', __dirname + '/resources/views');
    app.set('view engine', 'ejs');
    app.engine('html', renderFile);

    app.graph = async function(url : string,schemaClass : any,option : any){
        const schema = await buildSchema({
            resolvers: [schemaClass],
            container: Container
        });
    
        option['schema'] = schema;
    
        this.use(url,graphqlHTTP(option));
    }

    app.listen(4000);

    app.use('/static',express.static(__dirname+'/resources/static'));
    
    app.use(session({
        secret: '@#@2$lol-match#@1$#$',
        resave: false,
        saveUninitialized: true,
        cookie:{maxAge: (60 * 1000 * 30)}
    }));

    app.use(passport.initialize()); // passport 구동
    app.use(passport.session());

    interceptor(app);
    router(app);
    
    console.log("Running a GraphQL server");
}


run();