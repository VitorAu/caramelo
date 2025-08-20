import fastify from "fastify";
import crypto from "crypto";

const server = fastify({ logger: true });
const serverPort = 5432;

type studentInformation = {
  id: string;
  name: string;
};

const students: studentInformation[] = [
  {
    id: crypto.randomUUID(),
    name: "Pedro",
  },
  {
    id: crypto.randomUUID(),
    name: "João",
  },
  {
    id: crypto.randomUUID(),
    name: "Augusto",
  },
  {
    id: crypto.randomUUID(),
    name: "Miguel",
  },
];

server.get("/students", () => {
  return { students };
});

server.listen({ port: serverPort }).then(() => {
  console.log("HTTP server is running on PORT: " + serverPort);
});
