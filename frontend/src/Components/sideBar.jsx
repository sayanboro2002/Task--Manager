import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./sidebar.css";
import "boxicons/css/boxicons.min.css";

export default function SideBar() {
  const navigate = useNavigate();

  // Safely retrieve user data from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : {};

  // Simple and clean avatar fallback since image upload is removed
  const getProfilePicUrl = () => {
    if (user?.profilePic && user.profilePic.startsWith("http")) {
      return user.profilePic;
    }
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'User'}`;
  };

  const profilePicUrl = getProfilePicUrl();

  // Logout Handler Function
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  console.log("Full User Object from LocalStorage:", user);
  console.log("Resolved Profile Pic URL:", profilePicUrl);

  return (
    <div className="sidebar">
      {/* User Profile Section placed outside of <ul> for proper semantic structure */}
      <div className="user-profile-box">
        <div className="avatar-wrapper">
          <img 
             src={profilePicUrl} 
             alt="User Avatar" 
             className="profile-avatar" 
             onError={(e) => {
                e.target.onerror = null; 
                e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'User'}`;
             }}
          />
        </div>
        <h4 className="user-name">{user.username || "User"}</h4>
        <p className="user-email">{user.email || "user@gmail.com"}</p>
      </div>

      <ul className="sidebar-ul">
        {/* Home Navigation Link */}
        <li className="sidebar-li">
          <Link to={"/home"} className="sidebar-nav-link">
            <span className="item-icon">
              <i className="bx bxs-home"></i>
            </span>
            <span className="sidebar-item-txt">Home</span>
          </Link>
        </li>
          
        <li className="sidebar-li">
          <Link to="/create-task" className="sidebar-nav-link">
            <span className="item-icon">
              <i className='bx bx-plus-circle'></i>
            </span>
            <span className="sidebar-item-txt">Create Task</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link to="/dashboard" className="sidebar-nav-link">
            <span className="item-icon">
              <i className="bx bx-grid-alt"></i>
            </span>
            <span className="sidebar-item-txt">Dashboard</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link to="/team" className="sidebar-nav-link">
            <span className="item-icon">
               <i className="bx bx-group"></i>
            </span>
            <span className="sidebar-item-txt">Team Members</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link to={"/contact"} className="sidebar-nav-link">
            <span className="item-icon">
              <i className="bx bxs-contact"></i>
            </span>
            <span className="sidebar-item-txt">Contact</span>
          </Link>
        </li>

        <li className="sidebar-li" style={{ marginTop: "20px" }}>
          <div 
            onClick={handleLogout} 
            className="sidebar-nav-link" 
            style={{ cursor: "pointer" }}
          >
            <span className="item-icon">
              <i className="bx bx-log-out" style={{ color: "#ff4d4d" }}></i>
            </span>
            <span className="sidebar-item-txt" style={{ color: "#ff4d4d" }}>
              Logout
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}