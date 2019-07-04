import "reflect-metadata";

import graphqlHTTP from 'express-graphql';
import router from './lol-match/router';
import {buildSchema, ClassType} from "type-graphql";
import { Container } from "typedi";
import {createConnection,ConnectionOptions} from "typeorm";
import passport from "passport";
import session from "express-session";
import interceptor from "./lol-match/interceptor";
import {renderFile} from "ejs";
import test from "./lol-match-test/gerneric-test";
import App from "./lol-match/config/app";
async function run(){
    await createConnection();

    const app = App.bootstrap();

    interceptor(app);
    router(app);

    if(process.env.NODE_ENV == "development"){
        test();
    }
    
    console.log("Running a GraphQL server");
}


run();