import { UserRoutes } from "./routes/user.ts";
import { AuthRoutes } from "./routes/auth.ts";
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";

const port = Number(process.env.SERVER_PORT) || 3000;
const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "pid, hostname",
      },
    },
  },
});

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "secret",
});

server.register(AuthRoutes, { prefix: "v1" });
server.register(UserRoutes, { prefix: "v1" });

server.listen({ port: port }).then(() => {
  server.log.info("🚀 HTTP server is running");
});
