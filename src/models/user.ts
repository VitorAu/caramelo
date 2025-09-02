import type { IUser } from "../interfaces/user.ts";
import bcrypt from "bcrypt";
import database from "../database/knex.ts";

export class UserModel {
  static async create(user: IUser) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const [newUser] = await database<IUser>("users")
        .insert({
          ...user,
          password: hashedPassword,
        })
        .returning("*");

      return newUser;
    } catch (err) {
      throw new Error("Failed to create user: " + err);
    }
  }

  static async findAll() {
    return database<IUser>("users").select("*");
  }

  static async findById(id: string) {
    return database<IUser>("users").where({ id }).first();
  }

  static async patch(id: string, data: Partial<IUser>) {
    try {
      if (data.password) data.password = await bcrypt.hash(data.password, 10);
      const [updatedUser] = await database<IUser>("users")
        .where({ id })
        .update(data)
        .returning("*");
      return updatedUser;
    } catch (err) {
      throw new Error("Failed to patch user: " + err);
    }
  }
}
