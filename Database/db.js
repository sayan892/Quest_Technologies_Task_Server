const sql = require("mysql2");
require("dotenv").config();
const pool = sql.createPool({
  connectionLimit: 200,
  connectTimeout: 172800,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
pool.getConnection((err, connection) => {
  if (err) {
    console.log("Database Connection Failed", err);
  } else {
    console.log("Connected to Mysql Db");
  }
  var data =
    "CREATE TABLE IF NOT EXISTS products (id int(11) AUTO_INCREMENT PRIMARY KEY, ProductName VARCHAR(255) UNIQUE, Price INTEGER(20), Quantity INTEGER(20), Stock INTEGER(5), created_date TIMESTAMP NOT NULL  DEFAULT NOW() ON UPDATE NOW(), modifed_date TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW())";
  connection.query(data, function (err, result) {
    if (err) throw err;
  });
  connection.release();
});
module.exports = pool;
