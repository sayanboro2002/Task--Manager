import { useState, useEffect } from "react";
import axios from "axios";

export const useDashboardStats = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token"); 

        const res = await axios.get("http://localhost:3001/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;

  const pieData = [
    { name: "Pending", value: pendingTasks, color: "#9333EA" },
    { name: "In Progress", value: inProgressTasks, color: "#0EA5E9" },
    { name: "Completed", value: completedTasks, color: "#22C55E" },
  ];

  const barData = [
    { name: "Low", count: tasks.filter((t) => t.priority === "Low").length },
    { name: "Medium", count: tasks.filter((t) => t.priority === "Medium").length },
    { name: "High", count: tasks.filter((t) => t.priority === "High").length },
  ];

  return {
    tasks,
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
    pieData,
    barData,
  };
};