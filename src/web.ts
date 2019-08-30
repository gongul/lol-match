import "reflect-metadata";
import router from './lol-match/router';
import {createConnection,ConnectionOptions, getConnectionOptions} from "typeorm";
import interceptor from "./lol-match/interceptor";
import test from "./lol-match-test/gerneric-test";
import App from "./lol-match/config/app";
import {developmentOptions,productionOptions} from "./lol-match/config/ormconfig";
import { WebConfig } from "../interface/web-config";
import { exception } from "./lol-match/interceptor/exception";
import graphqlHTTP from 'express-graphql';
import http from 'http';
import Container from "typedi";
import Socket from "./lol-match/config/socket";

function configFn():WebConfig{
    let config:WebConfig = {ormConfig:productionOptions,serverPort:80};

    if(process.env.npm_lifecycle_event == "watch"){
        config['ormConfig'] = developmentOptions;
    }
    
    if(process.env.NODE_ENV == "development"){
        config.serverPort = 4000;
    }

    // if(process.env.NODE_ENV == "development"){
    //     config['ormConfig'] = developmentOptions;
    //     config.serverPort = 4000;
    // }

    return config
}

async function run(){
    const config:WebConfig = configFn();

    await createConnection(config.ormConfig);
    const app = App.bootstrap(config.serverPort);
    const server = http.createServer(app);
    const socket = Container.get(Socket);

    socket.init(server);
    interceptor(app);
    router(app);
    
    if(process.env.NODE_ENV == "development"){
        test(app);
    }
    
    app.use(exception);

    server.listen(config.serverPort,() => {
        console.log(`Running a GraphQL server port :${config.serverPort} NODE_ENV ${process.env.NODE_ENV}`);
    })
}


run();