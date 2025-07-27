import { getConnection, query, closeConnection } from "./utils/dbUtils.js";

async function testConnection() {
  try {
    console.log("Testing database connection...");

    // Test basic connection
    const connection = await getConnection();
    console.log("✅ Database connection successful!");

    // Test a simple query
    const result = await query("SELECT 1 as test");
    console.log("✅ Query test successful:", result);

    // Test database existence
    const dbResult = await query("SELECT DATABASE() as current_db");
    console.log("✅ Current database:", dbResult);

    // Test if tables exist
    const tables = await query("SHOW TABLES");
    console.log("📋 Tables in database:", tables);

    connection.release();
    console.log("🎉 All tests passed!");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.error("Error details:", error);
  } finally {
    await closeConnection();
  }
}

testConnection();
