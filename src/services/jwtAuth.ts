import type { FastifyReply, FastifyRequest } from "fastify";

export async function jwtAuth(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch {
    res.status(401).send({ error: "Unauthorized" });
  }
}
