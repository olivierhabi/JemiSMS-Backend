require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres"
  },

  // development: {
  //   database: "project11",
  //   username: "olivier",
  //   password: 1234,
  //   host: "127.0.0.1",
  //   dialect: "postgres"
  // },

  test: {
    database: "project11",
    username: "olivier",
    password: 1234,
    host: "127.0.0.1",
    dialect: "postgres"
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
};
