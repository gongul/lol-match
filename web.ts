import "reflect-metadata";
import express from 'express';
import graphqlHTTP from 'express-graphql';
import Route from './router/index-router';
import {buildSchema, ClassType} from "type-graphql";
import { Container } from "typedi";
import {createConnection,ConnectionOptions} from "typeorm";

const options: ConnectionOptions = {
    "type": "sqlite",
    "database": "database.sqlite",
    "synchronize": true,
    "logging": false,
    "entities": [
        __dirname+"/entity/**/*.ts"
    ]
};

async function run(){
    await createConnection()

    const app = express();
    app.listen(4000);
    app.graph = async function(url : string,schemaClass : any,option : any){
        const schema = await buildSchema({
            resolvers: [schemaClass],
            container: Container
        });
    
        option['schema'] = schema;
    
        this.use(url,graphqlHTTP(option));
    }
    
    
    Route(app);
    
    console.log("Running a GraphQL server");
}


run();