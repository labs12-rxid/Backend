require("dotenv").config();

const testDatabase = process.env.DATABASE_TEST;
const productionDatabase = process.env.DATABASE_URL;

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DEV_HOSTNAME || "localhost",
      database: process.env.DEV_DATABASE || "rxid",
      user: process.env.DEV_USER || "admin",
      password: process.env.DEV_PASSWORD || "pass"
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  testing: {
    client: "pg",
    connection: testDatabase,
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "pg",
    connection: productionDatabase,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
