import { ApolloServer } from "apollo-server-express";
import "dotenv-safe/config";
import express from "express";
import http from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RecListResolver } from "./resolver/RecListResolver";
import { UserResolver } from "./resolver/UserResolver";

(async () => {
  createConnection({
    type: "mongodb",
    url: process.env.MONGO_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
    },
  }).catch((error) => console.log(error));

  const schema = await buildSchema({
    resolvers: [UserResolver, RecListResolver],
  });

  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({ schema });

  await server.start();

  server.applyMiddleware({ app, path: "/" });

  const PORT = process.env.PORT || 4000;
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready on port ${PORT}.`);
})();
