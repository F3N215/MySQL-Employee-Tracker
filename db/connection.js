const mysql = require("mysql");

require("dotenv").config();

// Create a connection to the database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  console.log("You connected to the database! Way to go!")
);

module.exports = db;
