require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_DEV_HOST || 'localhost',
      database: process.env.DB_DEV_DATABASE || 'rxid_dev',
      user: process.env.DB_DEV_USER || 'admin',
      password: process.env.DB_DEV_PASSWORD,
      port: process.env.DB_DEV_PORT || '5432'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'pg',
    connection: {
      host: process.env.DB_TEST_HOST || 'localhost',
      database: process.env.DB_TEST_DATABASE || 'rxid_test',
      user: process.env.DB_TEST_USER || 'admin',
      password: process.env.DB_TEST_PASSWORD,
      port: process.env.DB_TEST_PORT || '5432'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_PROD_HOST || 'localhost',
      database: process.env.DB_PROD_DATABASE || 'rxid_prod',
      user: process.env.DB_PROD_USER || 'admin',
      password: process.env.DB_PROD_PASSWORD,
      port: process.env.DB_PROD_PORT || '5432'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
