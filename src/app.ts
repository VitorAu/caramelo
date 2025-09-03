import { UserRoutes } from "./routes/user.ts";
import { AuthRoutes } from "./routes/auth.ts";
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";

export async function buildApp() {
  const app = fastify({
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

  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "secret",
  });

  app.register(AuthRoutes, { prefix: "v1" });
  app.register(UserRoutes, { prefix: "v1" });

  return app;
}
