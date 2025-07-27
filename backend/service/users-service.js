import dbUtils from "../utils/dbUtils.js";

export async function registerUser(userData) {
  const connection = await dbUtils.getConnection();
  try {
    const [result] = await connection.query("INSERT INTO users SET ?", userData);
    return { id: result.insertId, ...userData };
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

export async function checkEmailExists(email) {
  const connection = await dbUtils.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length > 0;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

export async function findUserById(userId) {
  const connection = await dbUtils.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [userId]);
    return rows[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

export async function validateUserCredentials(email, password) {
  const connection = await dbUtils.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
    return rows[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}
