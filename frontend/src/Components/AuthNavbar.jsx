import React from 'react';

export default function AuthNavbar() {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4 py-3 mb-4">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold text-primary fs-4" style={{ cursor: "pointer" }}>
           Task Manager
        </span>
      </div>
    </nav>
  );
}