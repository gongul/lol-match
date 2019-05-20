import user from './user';
import {RecipeResolver} from "../resolve/user/user-resolve";
import {buildSchema} from "type-graphql";
import graphqlHTTP from 'express-graphql';

export default async function index(app: any){
    await user(app);

    // const schema = await buildSchema({
    //     resolvers: [RecipeResolver],
    // });

    // app.use("/graphql",
    //     graphqlHTTP({
    //         schema: schema,
    //         graphiql: false
    //     })
    // );
    

    app.graph("/graphql",RecipeResolver,
                {
                    graphiql: false
                })
}

