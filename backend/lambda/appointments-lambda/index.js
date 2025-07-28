import mysql from "mysql2/promise";
import fs from "fs";

// Database configuration (using environment variables for Lambda)
const dbConfig = {
  host: process.env.DB_HOST || "vitals-cloud-encrypted-db.csqxkybddgzn.us-east-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "password1",
  database: process.env.DB_NAME || "vitals_cloud_app",
  port: process.env.DB_PORT || 3306,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync("./global-bundle.pem"),
  },
  acquireTimeout: 60000,
  timeout: 60000,
};

let pool;

// Database utility functions adapted for Lambda
async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 3, // Lower limit for Lambda
      queueLimit: 0,
    });
  }
  return pool.getConnection();
}

async function query(sql, params = []) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query(sql, params);
    return rows;
  } finally {
    connection.release();
  }
}

// Appointment service functions
async function getAppointmentsByPatientId(patientId) {
  if (!patientId) {
    throw new Error("Patient ID is required");
  }

  const sql = `
    SELECT * 
    FROM appointments
    WHERE patientId = ?
    ORDER BY date ASC, time ASC
  `;

  return await query(sql, [patientId]);
}

async function createNewAppointment(appointmentData) {
  const { patientId, treatmentId, date, time, reason } = appointmentData;

  // Validation
  if (!patientId || !treatmentId || !date || !time || !reason) {
    throw new Error("Missing required fields: patientId, treatmentId, date, time, reason");
  }

  // Check for appointment conflicts (same patient, date, time)
  const conflictSql = `
    SELECT id FROM appointments 
    WHERE patientId = ? AND date = ? AND time = ?
  `;
  const conflicts = await query(conflictSql, [patientId, date, time]);

  if (conflicts.length > 0) {
    throw new Error("Appointment conflict: Patient already has an appointment at this date and time");
  }

  // Insert new appointment
  const insertSql = `
    INSERT INTO appointments (patientId, treatmentId, date, time, reason, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;

  const result = await query(insertSql, [patientId, treatmentId, date, time, reason]);

  // Return the created appointment data
  return {
    id: result.insertId,
    patientId,
    treatmentId,
    date,
    time,
    reason,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// Lambda handler function
export const handler = async (event) => {
  console.log("Event:", JSON.stringify(event, null, 2));

  const { httpMethod, pathParameters, queryStringParameters, body } = event;

  // CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  };

  // Handle preflight requests
  if (httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "CORS preflight response" }),
    };
  }

  try {
    switch (httpMethod) {
      case "GET":
        // Get appointments by patient ID (required parameter)
        if (!queryStringParameters || !queryStringParameters.patientId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              error: "Patient ID is required as query parameter (?patientId=123)",
            }),
          };
        }

        const appointments = await getAppointmentsByPatientId(queryStringParameters.patientId);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: appointments,
            count: appointments.length,
            patientId: queryStringParameters.patientId,
          }),
        };

      case "POST":
        // Create new appointment
        if (!body) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              error: "Request body is required",
            }),
          };
        }

        const appointmentData = JSON.parse(body);
        const newAppointment = await createNewAppointment(appointmentData);

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            success: true,
            message: "Appointment created successfully",
            data: newAppointment,
          }),
        };

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({
            success: false,
            error: "Method not allowed. Only GET and POST are supported.",
          }),
        };
    }
  } catch (error) {
    console.error("Lambda Error:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: "Internal server error",
        message: error.message,
      }),
    };
  } finally {
    // Clean up connections if needed
    if (pool) {
    }
  }
};
