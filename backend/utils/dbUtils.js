import mysql from "mysql2/promise";
import dbConfig from "../config/dbConfig.js";

const connection = await mysql.createConnection({
  host: dbConfig.RDS_ENDPOINT,
  user: dbConfig.RDS_USER,
  password: dbConfig.RDS_PASSWORD,
  database: dbConfig.RDS_DATABASE,
  port: dbConfig.RDS_PORT,
});

export async function getConnection() {
  if (connection.state === "disconnected") {
    await connection.connect();
  }
  if (connection.state === "connected") {
    return connection;
  }
  throw new Error("Database connection is not established");
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
  await getConnection().end();
}

export default {
  getConnection,
  query,
  closeConnection,
};
