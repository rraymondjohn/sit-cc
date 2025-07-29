/*
  RDS connection configuration
  - Backend folder will be in EC2 Instance and 
    can only communicate to the RDS instance through it
  - For better seccurity, use environment variables  - .env file
  - Connection details stored in this .js file for demonstration and testing purposes
*/

const RDS_ENDPOINT = "vitals-cloud-encrypted-db.csqxkybddgzn.us-east-1.rds.amazonaws.com";
const RDS_PORT = 3306;
const RDS_DATABASE = "vitals_cloud_app";
const RDS_USER = "admin";
const RDS_PASSWORD = "password1";

export default {
  RDS_ENDPOINT,
  RDS_PORT,
  RDS_DATABASE,
  RDS_USER,
  RDS_PASSWORD,
};
