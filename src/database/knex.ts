import knex from "knex";
import config from "../../knexfile.ts";

const database = knex(config.development)

export default database;
