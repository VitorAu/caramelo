import { UserRoutes } from "./routes/user.ts";
import fastify from "fastify";

const server = fastify({ logger: true });
const serverPort = 3000;

server.register(UserRoutes, { prefix: "v1" });

server.listen({ port: serverPort }).then(() => {
  console.log("HTTP server is running on PORT: " + serverPort);
});
