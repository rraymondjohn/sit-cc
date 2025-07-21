# SIT CC Backend Setup Guide

This guide will help you set up, install, and start the backend server for the SIT CC project.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (Node Package Manager)

## Installation

1. Open a terminal and navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Startup

To start the backend server, run:

```sh
npm start
```

The server will start on port 3001 by default. You can change the port by setting the `PORT` environment variable.

## Project Structure

- `server.js`: Main server file
- `routes/auth.js`: Authentication routes (login/register)
- `package.json`: Project dependencies and scripts

## Deployment

For AWS deployment, consider using services like EC2, Elastic Beanstalk, or Lambda. Make sure to use a persistent database for production.

---

## Deploying to AWS EC2

### 1. Prepare Your EC2 Instance

- Launch an EC2 instance (Amazon Linux or Ubuntu recommended).
- Open ports (e.g., 3001 or 80) in your EC2 security group for HTTP access.
- SSH into your instance.

### 2. Install Node.js and Git

```sh
sudo apt update
sudo apt install nodejs npm git
```

### 3. Clone Your Project

```sh
git clone <your-repo-url>
cd <project-folder>/backend
```

### 4. Install Dependencies

```sh
npm install
```

### 5. Start the Server

```sh
npm start
```

- Optionally, use a process manager like [PM2](https://pm2.keymetrics.io/) for production:
  ```sh
  npm install -g pm2
  pm2 start server.js
  pm2 startup
  pm2 save
  ```

### 6. Configure Reverse Proxy (Optional)

- For production, use Nginx or Apache to proxy requests from port 80 to your Node.js app.

### 7. Environment Variables

- Set environment variables (e.g., `PORT`, database credentials) using `.env` files or EC2 instance settings.

### 8. Persistent Storage

- For production, replace the in-memory user store with a database (MongoDB, PostgreSQL, etc.).

### 9. Security

- Restrict security group access to only necessary ports.
- Use HTTPS for secure communication (SSL certificates via Let's Encrypt or AWS ACM).

---

## Notes

- This backend uses an in-memory user store for demonstration. For production, integrate a database (e.g., MongoDB, PostgreSQL).
- CORS is enabled for development. Adjust settings for production security.
- For scaling, consider Elastic Beanstalk, ECS, or Lambda for serverless deployment.

---

For available API routes, see `ROUTES.md`.
