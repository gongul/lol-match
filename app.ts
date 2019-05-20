import "reflect-metadata";
import express from 'express';
import graphqlHTTP from 'express-graphql';
import Route from './router/index';
import {buildSchema} from "type-graphql";

const app = express();
app.listen(4000);
app.graph = async function(url : string,schemaClass : any,option : any){
    const schema = await buildSchema({
        resolvers: [schemaClass],
    });

    option['schema'] = schema;

    this.use(url,graphqlHTTP(option));
}

Route(app);

console.log("Running a GraphQL server");