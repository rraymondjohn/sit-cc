import dbUtils from "../utils/dbUtils.js";

// Get all treatments
export async function getAllTreatments() {
  const connection = await dbUtils.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM treatments");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Get treatment by ID
export async function getTreatmentById(id) {
  const connection = await dbUtils.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM treatments WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Get all treatments by doctor ID
export async function getTreatmentsByDoctorId(doctorId) {
  const connection = await dbUtils.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM treatments WHERE doctorId = ?", [doctorId]);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Create a new treatment
export async function createTreatment(treatmentData) {
  const connection = await dbUtils.getConnection();
  try {
    const [result] = await connection.query("INSERT INTO treatments SET ?", treatmentData);
    return { id: result.insertId, ...treatmentData };
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Update a treatment
export async function updateTreatment(id, treatmentData) {
  const connection = await dbUtils.getConnection();
  try {
    await connection.query("UPDATE treatments SET ? WHERE id = ?", [treatmentData, id]);
    return { id, ...treatmentData };
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Delete a treatment
export async function deleteTreatment(id) {
  const connection = await dbUtils.getConnection();
  try {
    await connection.query("DELETE FROM treatments WHERE id = ?", [id]);
    return { id };
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}
