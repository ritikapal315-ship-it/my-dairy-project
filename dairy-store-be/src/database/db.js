require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then((client) => {
    console.log("Database connected successfully!");
    client.release();
  })
  .catch((error) => {
    console.log("Database connection failed:");
    console.log(error);
  });

module.exports = pool;