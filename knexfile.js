const localPgConnection = {
  host: "localhost",
  database: "rxid",
  user: "admin",
  password: "pass"
};

const devDatabase = process.env.DATABASE_DEV || localPgConnection;
const testDatabase = process.env.DATABASE_TEST || localPgConnection;
const productionDatabase = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: "pg",
    connection: devDatabase + "?ssl=true",
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
    },
  },

  testing: {
    client: "pg",
    connection: testDatabase + "?ssl=true",
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
    connection: productionDatabase + "?ssl=true",
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
