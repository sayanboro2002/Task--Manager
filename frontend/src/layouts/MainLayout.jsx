import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/sideBar";

export default function MainLayout() {
  return (
    <div className="main-body">
      <SideBar />
      <div className="main-container">
        <Outlet /> 
      </div>
    </div>
  );  
}