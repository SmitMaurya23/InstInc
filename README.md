# Inst'Inc – Full-Stack Social Media Platform

**Live Website:** [https://instinc.onrender.com](https://instinc.onrender.com)

Inst'Inc is a modern, scalable social media platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to connect, share, and communicate in real time with a smooth and secure experience.

---

## 🚀 Features

* **User Profiles:** Create and customize personal profiles.
* **Image Posting:** Upload and share images securely with other users.
* **Dynamic Feed:** Browse posts from all users in an auto-updating feed.
* **Comments:** Engage with others through post comments.
* **User Search:** Find other users by username.
* **Real-Time Chat:** Communicate instantly with other users via integrated chat powered by WebSockets.
* **Secure Authentication:** Layered authentication using **sessions**, **cookies**, **JWT**, and **WebSockets** for chat security.

---

## 🏗️ Architecture Overview

Inst'Inc follows a **client-server architecture** with the following layers:

```
Frontend (React.js)  <---->  Backend API (Express.js & Node.js)  <---->  Database (MongoDB)
                                       |
                                       +---> Cloudinary (Image Storage)
                                       |
                                       +---> WebSockets (Real-time chat)
```

* **Frontend (React.js):** User interface, routing, and dynamic components.
* **Backend (Express.js + Node.js):** Handles API requests, authentication, and real-time communication.
* **Database (MongoDB):** Stores user data, posts, comments, and chat histories.
* **Cloudinary:** Efficient, secure image hosting and optimization.
* **WebSockets:** Enables persistent, low-latency chat communication.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Axios, WebSockets (Socket.IO), CSS/Tailwind (if used)
* **Backend:** Node.js, Express.js, JWT, bcrypt, Cookie-Parser, Socket.IO
* **Database:** MongoDB (with Mongoose ORM)
* **Cloud Services:** Cloudinary (for media storage)
* **Security:** JWT-based auth, cookie/session management, password hashing
* **Deployment:** Render (both frontend & backend)

---

## ⚙️ Installation & Setup

### Prerequisites

* [Node.js](https://nodejs.org/) and npm installed on your machine
* [MongoDB](https://www.mongodb.com/) instance (local or cloud-based)
* [Cloudinary](https://cloudinary.com/) account for image storage
* Basic knowledge of environment variables (`.env`) for secure credentials

---

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SmitMaurya23/InstInc.git
   ```

2. **Navigate to the project folder:**

   ```bash
   cd InstInc
   ```

3. **Backend Setup:**

   ```bash
   cd Backend
   npm install
   ```

4. **Set environment variables:**
   Create a `.env` file in the `Backend` directory and configure:

   ```
   MONGO_URI=your_mongo_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret
   PORT=4001
   ```

5. **Build the application (if needed):**

   ```bash
   npm run build
   ```

6. **Start the server:**

   ```bash
   npm start
   ```

7. **Access the application:**
   Open your browser and go to:

   ```
   http://localhost:4001
   ```

---

## 🧩 Configuration Notes

* Make sure the **MongoDB** and **Cloudinary** credentials are updated in the `.env` file.
* Adjust **CORS settings** if deploying on a custom domain.
* WebSocket (Socket.IO) requires correct origin settings when deploying.

---

## 🌐 Deployment

Inst'Inc is deployed on **Render**.
For deploying your own version:

* Use services like **Render**, **Vercel**, or **Netlify** for the frontend.
* Deploy backend to **Render**, **Railway**, or any Node.js hosting provider.
* Ensure both services are correctly linked via environment variables for API and WebSocket connections.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a pull request.

---
