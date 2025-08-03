# Project Setup Instructions

This document outlines the steps to set up and run the project, which consists of separate frontend and backend folders. Ensure you follow these instructions carefully to configure and start the application.

## Prerequisites

- **Node.js and npm**: Ensure Node.js and npm are installed on your system.
- **Gemini API Key**: Obtain a valid Gemini API key for backend configuration.

## Setup Instructions

### 1. Install Dependencies

Both the `frontend` and `backend` folders require their dependencies to be installed using npm.

#### Frontend

1. Open a terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

#### Backend

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### 2. Configure Backend Environment Variables

Environment variables must be set in the `.env` file located in the root of the `backend` folder.

#### Backend

1. Create a `.env` file in the `backend` folder if it doesn't exist.
2. Update the `GEMINI_API_KEY` variable with your valid Gemini API key. For example:
   ```
   GEMINI_API_KEY=your-gemini-api-key
   ```

   Ensure the API key is valid and securely stored.

### 3. Create Backend Environment File

If the `.env` file does not already exist in the `backend` folder, create it in the root directory with the following content:

#### Backend `.env`

In the `backend` folder, create a file named `.env` with the following:

```
# Backend Environment Variables
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Run the Application

#### Frontend

1. In the `frontend` folder, start the development server:
   ```bash
   npm run dev
   ```

2. The frontend application should now be running, typically accessible at `http://localhost:3000` (or the port specified in your configuration).

#### Backend

1. In the `backend` folder, start the development server:
   ```bash
   npm run dev
   ```

2. The backend server should now be running, typically accessible at `http://localhost:5000` (or the port specified in your configuration).

## Notes

- Ensure both the frontend and backend servers are running simultaneously for full application functionality.
- The frontend is configured to connect to the backend server automatically (hard-coded configuration).
- Keep your Gemini API key secure and avoid exposing it in public repositories or version control systems.
- If you encounter issues, check the console output for errors and ensure all dependencies are correctly installed.

For additional support, refer to the project documentation or contact the development team.
