import mysql from "mysql2/promise";
import dbConfig from "../config/dbConfig.js";

let pool;

export async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: dbConfig.RDS_ENDPOINT,
      user: dbConfig.RDS_USER,
      password: dbConfig.RDS_PASSWORD,
      database: dbConfig.RDS_DATABASE,
      port: dbConfig.RDS_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool.getConnection();
}

export async function query(sql, params) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query(sql, params);
    return rows;
  } finally {
    connection.release();
  }
}

export async function closeConnection() {
  if (pool) {
    await pool.end();
  }
}

export default {
  getConnection,
  query,
  closeConnection,
};
