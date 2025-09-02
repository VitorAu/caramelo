import type { IUser } from "../interfaces/user.ts";
import type { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import database from "../database/knex.ts";
import "@fastify/jwt";

export class AuthModel {
  static async login(
    fastify: FastifyInstance,
    email: string,
    password: string
  ) {
    try {
      const user = await database<IUser>("users").where({ email }).first();
      if (!user) throw new Error("Invalid email");
      const isPasswordValid = bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid password");

      const accessToken = fastify.jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        { expiresIn: "15m" }
      );
      const refreshToken = fastify.jwt.sign(
        {
          id: user.id,
          email: user.email,
          type: "refresh",
        },
        { expiresIn: "14d" }
      );

      return { accessToken, refreshToken, user };
    } catch (err) {
      throw new Error("Failed to login: " + err);
    }
  }
}
