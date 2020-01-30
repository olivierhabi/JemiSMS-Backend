import dotenv from "dotenv";

dotenv.config();

import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on("connect", () => {
  console.log("Connected to database succesfully");
});

const createUserTables = () => {
  const queryText = `DROP TABLE IF EXISTS users; CREATE TABLE
        users(
          id SERIAL,
          name VARCHAR(128) NOT NULL,
          na_id VARCHAR(128) UNIQUE NOT NULL,
          phone VARCHAR(128) UNIQUE NOT NULL,
          email VARCHAR(128) UNIQUE NOT NULL,
          d_birth VARCHAR(128) NOT NULL,
          password VARCHAR(128) NOT NULL,
          status VARCHAR(128) NOT NULL,
          position VARCHAR(128) NOT NULL
  
  
  
        )`;
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = createUserTables;

require("make-runnable");
