import fastify from "fastify";

const server = fastify({ logger: true });
const serverPort = 3000;

server.listen({ port: serverPort }).then(() => {
  console.log("HTTP server is running on PORT: " + serverPort);
});
