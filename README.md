# 📋 Collaborative Task Management System (MERN Stack)

A full-stack web application designed and built for managing daily tasks, tracking progress through checklists, and collaborating seamlessly with team members. Built for modern web workflows and campus placement preparation.

---

## 🚀 Key Features

* **Secure Authentication:** User registration and login system with JWT (JSON Web Tokens) and secure password management.
* **Task Management (CRUD):** Create, read, update, and delete tasks with custom priorities, statuses, start dates, and due dates.
* **Interactive Checklists & Progress:** Sub-tasks management that automatically calculates and visualizes real-time completion percentages.
* **Team Collaboration:** Assign tasks and coordinate with team members effectively.
* **Modern UI/UX:** Built with React, React Router, custom hooks, layouts, and quick-action edit workflows.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, React Router, Bootstrap, Boxicons, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT, bcryptjs

---

## 📂 Project Structure

```text
Task--Manager/
│
├── backend/                  # Node.js & Express server
│   ├── config/               # Database and environment configurations
│   ├── controllers/          # Business logic and request handlers
│   ├── middleware/           # Authentication and custom middlewares
│   ├── models/               # Mongoose schemas (User, Task, etc.)
│   ├── routes/               # API endpoints
│   ├── uploads/              # Uploaded media/files storage
│   └── server.js             # Server entry point
│
└── frontend/                 # React application
    ├── public/               # Static assets
    └── src/
        ├── auth/             # Authentication logic/views
        ├── Components/       # Reusable UI components (TaskCard, Navbar, etc.)
        ├── hooks/            # Custom React hooks
        ├── layouts/          # Page layouts and wrappers
        ├── Pages/            # Main application views (Home, Dashboard, Login, etc.)
        ├── Routes/           # Route definitions and protected routing
        ├── Utils/            # Helper functions and utilities
        ├── App.js            # Root component with route configurations
        └── index.js          # React entry point


## 📸 Project Screenshots

### 1. Login Page
![Login Page](/frontend/assets/login.png)

### 2. Register Page
![Register Page](/frontend/assets/register.png)

### 3. Home / Dashboard Page
![Dashboard](/frontend/assets/home.png)

### 4. Create Task Page
![Create Task](/frontend/assets/create-task.png)

### 5. Task Report / Export Feature
![Task Report](/frontend/assets/download-report.png)

### 6. Team Member View
![Team Member](/frontend/assets/team-member.png)        