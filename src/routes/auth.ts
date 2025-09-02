import type { FastifyInstance } from "fastify";
import { AuthModel } from "../models/auth.ts";

export async function AuthRoutes(fastify: FastifyInstance) {
  fastify.post("/auth/login", async (req, res) => {
    interface DataType {
      email: string;
      password: string;
    }

    const data = req.body as DataType;
    if (!data.email || !data.password) {
      return res.status(400).send({
        success: false,
        error: "Missing required fields",
      });
    }

    try {
      const response = await AuthModel.login(
        fastify,
        data.email,
        data.password
      );
      return res.status(201).send({ success: true, data: response });
    } catch (err) {
      return res
        .status(500)
        .send({ success: false, error: "Server error: " + err });
    }
  });
}
