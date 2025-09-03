import { buildApp } from "./app.ts";

export async function initializeServer() {
  const port = Number(process.env.SERVER_PORT) || 3000;
  const app = await buildApp();

  try {
    await app.listen({ port: port }).then(() => {
      app.log.info("🚀 HTTP server is running");
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

initializeServer();
