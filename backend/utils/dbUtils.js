import mysql from "mysql2/promise";
import dbConfig from "../config/dbConfig.js";

const pool = mysql.createPool({
  host: dbConfig.RDS_ENDPOINT,
  port: dbConfig.RDS_PORT,
  user: dbConfig.RDS_USER,
  password: dbConfig.RDS_PASSWORD,
  database: dbConfig.RDS_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function getConnection() {
  const connection = await pool.getConnection();
  return connection;
}

export async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function closeConnection() {
  await pool.end();
}

export default {
  getConnection,
  query,
  closeConnection,
};
