require('dotenv').config()

const defaultDialect = 'postgres'

const fromEnv = () => ({
  username: process.env.PGUSER || 'app',
  password: process.env.PGPASSWORD || 'app',
  database: process.env.PGDATABASE || 'app',
  host: process.env.PGHOST || '127.0.0.1',
  port: Number(process.env.PGPORT || 5432),
  dialect: process.env.DB_DIALECT || defaultDialect,
})

module.exports = {
  development: process.env.DATABASE_URL
    ? { use_env_variable: 'DATABASE_URL', dialect: defaultDialect }
    : fromEnv(),

  test: process.env.TEST_DATABASE_URL
    ? { use_env_variable: 'TEST_DATABASE_URL', dialect: defaultDialect }
    : { ...fromEnv(), database: 'app_test' },

  production: process.env.DATABASE_URL
    ? { use_env_variable: 'DATABASE_URL', dialect: defaultDialect }
    : fromEnv(),
}
