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
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  }
};
