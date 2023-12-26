const mysql = require("mysql");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "UserDatabase",
});

connection.on("error", (error) => {
  console.error("Error with the connection pool: ", error);
});

console.log("connected to database");

module.exports = connection;

// const connection = mysql.createPool({
//   host: "sql12.freemysqlhosting.net",
//   user: "sql12672558",
//   password: "mnsK6vV9Hg",
//   database: "sql12672558",
//   port: 3306,
// });
