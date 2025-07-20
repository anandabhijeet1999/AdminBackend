# Backend - Step-by-Step Guide

## 1. Prerequisites
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

## 2. Installation
```bash
cd backend
npm install
```

## 3. Environment Variables
- Create a `.env` file in the `backend/` directory with the following variables:
  ```env
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5000 # or any port you prefer
  ```

## 4. Running the Server
```bash
npm start
```
- The server will run on [http://localhost:5000](http://localhost:5000) by default.

## 5. API Endpoints
- Auth: `/api/auth`
- Agents: `/api/agents`
- Contacts: `/api/contacts`

## 6. File Uploads
- Uploaded files are stored in the `uploads/` directory.

## 7. Project Structure
- `controllers/` - Route handlers
- `models/` - Mongoose models
- `routes/` - API route definitions
- `middleware/` - Express middleware (e.g., auth)
- `utils/` - Utility functions

---
For any issues, please contact the maintainer or open an issue. 