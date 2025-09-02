import type { FastifyInstance } from "fastify";
import type { IUser } from "../interfaces/user.ts";
import { UserModel } from "../models/user.ts";
import { jwtAuth } from "../services/jwtAuth.ts";

export async function UserRoutes(fastify: FastifyInstance) {
  fastify.post("/users", async (req, res) => {
    interface DataType {
      name: string;
      username: string;
      email: string;
      birth_date: Date;
      password: string;
    }

    const data = req.body as DataType;
    if (
      !data.name ||
      !data.username ||
      !data.email ||
      !data.birth_date ||
      !data.password
    ) {
      return res.status(400).send({
        success: false,
        error: "Missing required fields",
      });
    }

    try {
      const response = await UserModel.create(data as IUser);
      return res.status(201).send({ success: true, data: response });
    } catch (err) {
      return res
        .status(500)
        .send({ success: false, error: "Server error: " + err });
    }
  });

  fastify.get("/users", { preHandler: jwtAuth }, async (req, res) => {
    try {
      const response = await UserModel.findAll();
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res
        .status(500)
        .send({ success: false, error: "Server error: " + err });
    }
  });

  fastify.get("/users/me", { preHandler: jwtAuth }, async (req, res) => {
    try {
      return res.status(200).send({ success: true, data: req.user });
    } catch (err) {
      return res.status(500).send({
        success: false,
        error: "Server error: " + err,
      });
    }
  });

  fastify.get("/users/:id", { preHandler: jwtAuth }, async (req, res) => {
    interface ParamsType {
      id: string;
    }

    const params = req.params as ParamsType;
    if (!params.id) {
      return res.status(400).send({
        success: false,
        message: "Missing user id",
      });
    }

    try {
      const response = await UserModel.findById(params.id);
      return res.status(200).send({
        success: true,
        data: response,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ success: false, error: "Server error: " + err });
    }
  });

  fastify.patch("/users/:id", { preHandler: jwtAuth }, async (req, res) => {
    interface DataType {
      name: string;
      username: string;
      email: string;
      birth_date: Date;
    }

    interface ParamsType {
      id: string;
    }

    const data = req.body as Partial<DataType>;
    const params = req.params as ParamsType;
    if (!data.name && !data.username && !data.email && !data.birth_date) {
      return res.status(400).send({
        success: false,
        error: "Missing required fields",
      });
    }

    if (!params.id) {
      return res.status(400).send({
        success: false,
        message: "Missing user id",
      });
    }

    try {
      const response = await UserModel.patch(params.id, data);
      return res.status(200).send({
        success: true,
        data: response,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ success: false, error: "Server error: " + err });
    }
  });

  fastify.put(
    "/users/:id/password",
    { preHandler: jwtAuth },
    async (req, res) => {
      interface DataType {
        password: string;
      }

      interface ParamsType {
        id: string;
      }

      const data = req.body as DataType;
      const params = req.params as ParamsType;
      if (!data.password) {
        return res.status(400).send({
          success: false,
          error: "Missing required fields",
        });
      }

      if (!params.id) {
        return res.status(400).send({
          success: false,
          message: "Missing user id",
        });
      }

      try {
        const response = await UserModel.patch(params.id, data);
        return res.status(200).send({
          success: true,
          data: response,
        });
      } catch (err) {
        return res
          .status(500)
          .send({ success: false, error: "Server error: " + err });
      }
    }
  );
}
