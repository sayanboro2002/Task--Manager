import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "boxicons/css/boxicons.min.css"; 


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle form submission and API authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', formData);
      
      // Save authentication token and user data securely to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));

      alert("Login Successful!");
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div className="main-auth-page">
      

      <div className="main-auth-container">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Please enter your details to log in</p>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="main-auth-btn">
            LOGIN
          </button>
        </form>

        <div className="main-auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;