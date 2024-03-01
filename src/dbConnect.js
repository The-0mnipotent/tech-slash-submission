import mysql from "mysql2";

// MySQL connection
export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "univ_db",
});
