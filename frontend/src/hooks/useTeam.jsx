import { useState, useEffect } from "react";
import axios from "axios";
import { downloadTeamReport as exportTeamReport } from "../Utils/exportUtils";

export const useTeam = () => {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", avatar: "" });

  // Fetch team members with authentication token
  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3001/api/team", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching team members:", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new team member with authentication token
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3001/api/team", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ name: "", email: "", avatar: "" });
      setShowModal(false);
      fetchMembers();
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  // Export team performance report using centralized utility function
  const downloadTeamReport = () => {
    exportTeamReport(members);
  };

  return {
    members,
    showModal,
    setShowModal,
    formData,
    handleChange,
    handleSubmit,
    downloadTeamReport,
  };
};