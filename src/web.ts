import "reflect-metadata";
import router from './lol-match/router';
import {createConnection,ConnectionOptions, getConnectionOptions} from "typeorm";
import interceptor from "./lol-match/interceptor";
import test from "./lol-match-test/gerneric-test";
import App from "./lol-match/config/app";
import {developmentOptions,productionOptions} from "./lol-match/config/ormconfig";
import { WebConfig } from "interface/web-config";
import { exception } from "./lol-match/interceptor/exception";
import graphqlHTTP from 'express-graphql';

function configFn():WebConfig{
    let config:WebConfig = {ormConfig:productionOptions,serverPort:80};

    if(process.env.NODE_ENV == "development"){
        config['ormConfig'] = developmentOptions;
        config.serverPort = 4000;
    }

    return config
}

/*  
    development로 실행 시 ts 파일 자체를 실행시켜야 한다. yarn watch(ts-node)
    해당 방법이 싫거나 문제점이 있을 시 ormConfig에 entity를 수정하면 된다.(ts 파일을 엔티티로 등록하기 때문에)
*/
async function run(){
    const config:WebConfig = configFn();
    
    await createConnection(config.ormConfig);
    const app = App.bootstrap(config.serverPort);

    interceptor(app);
    router(app);
    
    if(process.env.NODE_ENV == "development"){
        test(app);
    }
    
    app.use(exception);

    console.log(`Running a GraphQL server port :${config.serverPort} NODE_ENV ${process.env.NODE_ENV}`);
}


run();