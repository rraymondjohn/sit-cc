# Unified Healthcare Management Platform (SIT Cloud Computing Project)

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

- **Frontend**: Vanilla HTML/CSS/JS hosted on **S3**, distributed via **CloudFront**.
- **Backend**: **Express.js** on **EC2** or **Lambda** for serverless processing.
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

## Technology Stack

### Frontend

- **Languages**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Vanilla JavaScript (no frameworks)
- **Styling**: Bootstrap CSS, Custom CSS
- **Hosting**: AWS S3 Static Website Hosting

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **API**: RESTful API architecture
- **Hosting**: AWS EC2 or AWS Lambda (serverless)

### Database & Storage

- **File Storage**: AWS S3 (for prescriptions, documents)
- **Metadata**: DynamoDB (for comments, version tracking)
- **In-Memory Data**: JSON files (for development)

### AWS Services

- **Compute**: EC2, Lambda
- **Storage**: S3, DynamoDB
- **Security**: Cognito, KMS
- **Networking**: CloudFront, API Gateway
- **Monitoring**: CloudWatch, CloudTrail
- **Notifications**: SNS

## Local Development Setup

### Prerequisites

- Node.js (v18 or higher)
- Git
- Text editor (VS Code recommended)

### Frontend Setup

1. **Clone the repository**

   ```bash
   git clone YOUR_REPOSITORY_URL
   cd sit-cc/frontend
   ```

2. **Serve frontend locally**

   ```bash
   # Option 1: Using Live Server (VS Code extension)
   # Right-click on index.html and select "Open with Live Server"

   # Option 2: Using Node.js http-server
   npx http-server . -p 3000

   # Option 3: Using Python
   python -m http.server 3000
   ```

3. **Access the application**
   - Open browser and navigate to `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd sit-cc/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   # Development mode
   npm start

   # Development mode with auto-restart
   npm run dev
   ```

4. **Test API endpoints**
   - API will be available at `http://localhost:3001`
   - Test endpoint: `http://localhost:3001/api/health`

### Environment Configuration

Create a `.env` file in the backend directory:

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Project Structure

```
sit-cc/
├── frontend/
│   ├── index.html
│   ├── appointments.html
│   ├── treatments.html
│   ├── css/
│   │   ├── custom.css
│   │   └── pages/
│   └── js/
│       ├── service/
│       ├── pages/
│       └── components/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   │   ├── appointments.js
│   │   ├── treatments.js
│   │   ├── users.js
│   │   └── auth.js
│   └── data/
│       ├── appointmentsData.js
│       ├── treatmentsData.js
│       └── usersData.js
└── aws/
    └── vitals-cloud-key.pem
```

## API Documentation

### Base URL

- **Local Development**: `http://localhost:3001/api`
- **Production**: See AWS deployment guide

### Authentication

- Session-based authentication
- Role-based access control (Doctor, Patient, Pharmacy, Provider)

### Endpoints

#### Treatments

- `GET /api/treatments` - Get all treatments
- `GET /api/treatments/doctor/:doctorId` - Get treatments by doctor
- `POST /api/treatments` - Create new treatment
- `PUT /api/treatments/:index` - Update treatment
- `DELETE /api/treatments/:index` - Delete treatment

#### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

#### Appointments

- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/user/:userId` - Get appointments by user
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

## Deployment

For detailed deployment instructions to AWS, see: **[AWS-DEPLOYMENT.md](AWS-DEPLOYMENT.md)**

The deployment guide covers:

- Frontend deployment to S3 with static website hosting
- Backend deployment to EC2 or Lambda
- CORS configuration
- Security group setup
- Troubleshooting common issues
