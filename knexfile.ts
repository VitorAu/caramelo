import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "lectio",
      password: "ovCjWA23OBSU4pgQ1zhY",
      database: "lectio",
    },
    migrations: {
      directory: "./src/database/migrations",
      extension: "ts",
    },
  },
};

export default config;
