import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(data.error || "Failed to send message!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error! Make sure Backend server is running.");
    }
  };

  return (
    <div style={{ flex: 1, padding: "40px", overflowY: "auto", backgroundColor: "#F8FAFC", minHeight: "100vh", boxSizing: "border-box" }}>
      <div style={{ background: "#fff", padding: "35px", borderRadius: "12px", maxWidth: "600px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", margin: "0 auto" }}>
        
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px", color: "#1E293B" }}>Contact Us</h2>
        <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "24px" }}>Have any questions? Send us a message!</p>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0", outline: "none", fontSize: "14px", boxSizing: "border-box" }}
              required
            />
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0", outline: "none", fontSize: "14px", boxSizing: "border-box" }}
              required
            />
          </div>

          {/* Message Field */}
          <div style={{ marginBottom: "25px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>Message</label>
            <textarea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0", outline: "none", fontSize: "14px", height: "120px", resize: "none", boxSizing: "border-box" }}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{ width: "100%", backgroundColor: "#EFF6FF", color: "#1D4ED8", padding: "14px", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "all 0.2s" }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;