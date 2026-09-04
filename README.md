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

### 1. Register Page
![Register Page](https://github.com/sayanboro2002/collaborative-task-manager/raw/main/Screenshot%202026-09-04%20092719.png)

### 2. Login Page
![Login Page](https://github.com/sayanboro2002/collaborative-task-manager/raw/main/Screenshot%202026-09-04%20092759.png)

### 3. Home Page
![Home Page](https://github.com/user-attachments/assets/6d19bc19-6887-4ca0-8b12-611e89b2cbbc)

### 4. Dashboard Page
![Dashboard Page](https://github.com/user-attachments/assets/a2be09be-14fa-4918-afcd-223e3d7108b5)

### 5. Create-Task Page
![Create-Task Page](https://github.com/user-attachments/assets/bd1f3f36-98d9-4db4-bba592eebf53)

### 6. Team-Member View
![Team-Member View](https://github.com/user-attachments/assets/482ab179-e933-48fd-8602-baaf4402ca88)

### 7. Download-Report
![Download-Report](https://github.com/user-attachments/assets/cffb375b-d748-464e-901d-f9c641b688fb)
