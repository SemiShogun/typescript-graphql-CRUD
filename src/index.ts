import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { TodoResolver } from './resolvers/TodoResolver';
import { createConnection } from 'typeorm';
 
(async () => {
    try {
        const app = express();

        await createConnection();
    
        const server = new ApolloServer({
            schema: await buildSchema({
                resolvers: [TodoResolver],
            }),
            context: ({ req, res }) => ({ req, res }),
        });
        
        app.use('*', cors());
        server.applyMiddleware({ app, path: '/graphql' });
        
        app.listen(8080, () => {
            console.log('Running');
        })
    } catch (error) {
        console.error(error);
    }
})();
