import express, { Application } from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schemas/schema";
import { resolvers } from "./graphql/resolvers/resolver";
import connectDB from "./config/db";
import routesProduct from "./routes/product.routes";

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api", routesProduct);

async function startServer() {
  await connectDB();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    cache: "bounded"
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app as any, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(`Server running`);
    console.log(`GraphQL ready `);
  });
}

startServer().catch((err) => {
  console.error("Error al iniciar el servidor:", err);
});
