import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "boxicons/css/boxicons.min.css"; 
import AuthNavbar from '../Components/AuthNavbar'; 

const Register = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Form submit handler without image upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      alert(response.data.message || "Registration Successful! Please login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div className="main-auth-page">
      
      <AuthNavbar />

      <div className="main-auth-container">
        <h2>Create Account</h2>
        <p className="login-subtitle">Please enter your details to sign up</p>

        <form onSubmit={handleSubmit}>
          
          {/* Username Input */}
          <div className="main-form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Raja Das"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          {/* Email Input */}
          <div className="main-form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="raja@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Password Input with Show/Hide Toggle */}
          <div className="main-form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 Characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <i
                className={`bx ${showPassword ? "bx-show" : "bx-hide"} password-toggle-icon`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="main-auth-btn">
            Register
          </button>
        </form>

        {/* Footer Link */}
        <div className="main-auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;