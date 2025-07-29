/*
  Configuration to connect to backend services.
  - EC2 Instance (Node.js Express API)
  - AWS API Gateway & Lambda (Appointments API)
*/

// EC2 Instance URL
export const API_BASE_URL = "http://13.221.199.199:3001/api";

// Appointments API Endpoint via AWS API Gateway to Lambda
export const APPOINTMENTS_ENDPOINT = `https://rl0u18vzy9.execute-api.us-east-1.amazonaws.com/dev/appointments`;
