# VideoSense - Video Processing Platform

VideoSense is a full-stack web application designed for uploading, streaming, and managing video content securely. It features a modern React frontend and a robust Node.js backend that handles video storage using MongoDB GridFS.

## 🚀 Features

- **User Authentication**: Secure Login and Registration using JWT (JSON Web Tokens).
- **Video Upload**: Support for MP4 video uploads via `multer`.
- **Secure Streaming**: Token-protected video streaming endpoints.
- **Dashboard**: View uploaded videos with status indicators.
- **Role-Based Access**: Admin users can delete videos; regular users can upload and view.
- **Modern UI**: Built with React, Vite, and Tailwind CSS v4.

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Storage**: MongoDB GridFS (for handling large video files)
- **Authentication**: JWT & Bcryptjs
- **Real-time**: Socket.io (configured)

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **State Management**: Context API

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local instance or Atlas URI)

### 1. Backend Setup
Navigate to the backend directory, install dependencies, and start the server.

```bash
cd backend
npm install

# Create a .env file in the backend folder with the following:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key

npm run dev
```
*The backend runs on `http://localhost:5000` by default.*

### 2. Frontend Setup
Open a new terminal, navigate to the frontend directory, and start the client.

```bash
cd frontend
npm install
npm run dev
```
*The frontend runs on `http://localhost:5173` (or similar).*

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | Login and receive JWT |
| **GET** | `/api/videos` | Fetch all videos |
| **POST** | `/api/videos/upload` | Upload a video file (Multipart) |
| **GET** | `/api/videos/stream/:id` | Stream video (Requires token query param) |
| **DELETE** | `/api/videos/:id` | Delete a video (Admin only) |

## 📂 Project Structure

```
Assignment/
├── backend/            # Server-side logic
│   ├── src/
│   │   ├── config/     # DB connection
│   │   ├── controller/ # Business logic
│   │   ├── middleware/ # Auth & Upload checks
│   │   ├── models/     # Mongoose Schemas
│   │   └── routes/     # API Routes
│
└── frontend/           # Client-side application
    ├── src/
    │   ├── components/ # Header, Footer
    │   ├── context/    # AuthContext
    │   ├── pages/      # Dashboard, Login, Upload
    │   └── App.jsx     # Main Router
```

You can create users with role as ["admin", "editor", "viewer"]. 
Use postman to creat an user with particular role. 
Else if you register from UI, role viewer will be set as default.
