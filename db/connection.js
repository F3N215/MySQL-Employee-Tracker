const mysql = require("mysql2");

require("dotenv").config();

// creates a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("There was an error " + err.stack);
    return;
  }
  console.log("You connected to the database! Way to go!");
});

module.exports = db;
