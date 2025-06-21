# Unified Healthcare Management Platform (SIT Cloud Cloud Computing Project)

## Overview
The Unified Healthcare Management Platform combines prescription management and provider collaboration into a secure, AWS-powered solution. It serves doctors, patients, pharmacies, and healthcare providers, ensuring compliance with standards like HIPAA.

## Features
- **Prescription Management**:
  - Doctors upload prescriptions to Amazon S3.
  - Patients view their prescriptions via a secure portal.
  - Pharmacies verify and fulfill prescriptions.
- **Provider Collaboration**:
  - Providers upload and share treatment plans.
  - Commenting and version control for treatment plans.
  - Notifications for updates via Amazon SNS.
- **Security & Compliance**:
  - Role-based access with Amazon Cognito.
  - Data encrypted with AWS KMS.
  - Audit logs via AWS CloudTrail.

## User Roles
- **Doctors**: Upload prescriptions and treatment plans, manage patient data.
- **Patients**: Access their prescriptions.
- **Pharmacies**: Verify and fulfill prescriptions.
- **Providers**: Collaborate on treatment plans.

## AWS Architecture
- **Frontend**: React SPA hosted on **S3**, distributed via **CloudFront**.
- **Backend**: **Lambda** and **API Gateway** for serverless processing.
- **Storage**:
  - **S3**: Encrypted storage for prescriptions and treatment plans.
  - **DynamoDB**: Metadata, comments, and version tracking.
- **Security**:
  - **Cognito**: Authentication and access control.
  - **KMS**: Encryption key management.
- **Notifications**: **SNS** for emails/SMS alerts.
- **Auditing**: **CloudTrail** for compliance logs.

## Sample Workflow
1. **Prescription**:
   - Doctor uploads a prescription to **S3**.
   - Metadata saved in **DynamoDB**.
   - Patient and pharmacy notified via **SNS**.
   - Pharmacy verifies and marks it fulfilled.
2. **Collaboration**:
   - Provider uploads a treatment plan to **S3**.
   - Authorized providers comment (stored in **DynamoDB**) and update versions.
   - Updates trigger **SNS** notifications.

## Benefits
- Scalable, serverless design.
- Secure and compliant with healthcare regulations.
- Streamlined workflows for all users.
