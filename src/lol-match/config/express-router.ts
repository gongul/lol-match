import { Router as ExpressRouter } from "express";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import graphqlHTTP from 'express-graphql';

export default function Router():ExpressRouter{
    const _router:ExpressRouter = ExpressRouter();

    _router.graph = async function(url : string,schemaClass : any,option : any){
        const schema = await buildSchema({
            resolvers: [schemaClass],
            container: Container
        });
    
        option['schema'] = schema;
    
        this.use(url,graphqlHTTP(option));
    }  

    return _router;
} 
