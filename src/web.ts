import "reflect-metadata";
import router from './lol-match/router';
import {createConnection,ConnectionOptions} from "typeorm";
import interceptor from "./lol-match/interceptor";
import test from "./lol-match-test/gerneric-test";
import App from "./lol-match/config/app";
import {developmentOptions,productionOptions} from "./lol-match/config/ormconfig";

async function run(){
    // development로 실행 시 ts 파일 자체를 실행시켜야 한다. yarn watch(ts-node)
    const ormConfig:ConnectionOptions = process.env.NODE_ENV  == "development" ? developmentOptions : productionOptions;
    
    await createConnection(ormConfig);
    const app = App.bootstrap();
    interceptor(app);
    router(app);

    if(process.env.NODE_ENV == "development"){
        test()
    }
    
    console.log("Running a GraphQL server");
}


run();