import Register from "./auth/Register";
import Login from "./auth/Login"; 
import Home from "./Pages/Home";        
import ProtectedRoute from "./Routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import UpdateTask from "./Pages/UpdateTask";
import CreateTask from "./Pages/CreateTask";
import Dashboard from "./Pages/Dashboard";
import Contact from "./Pages/Contact";
import Team from "./Pages/Team";   
import "./main.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} /> 

        
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} /> 
          <Route path="/update-task/:id" element={<UpdateTask />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        
        <Route
          path="*"
          element={
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "80vh" }}
            >
              <h1 className="text-muted">404 || NOT FOUND</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;