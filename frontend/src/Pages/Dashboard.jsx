import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useDashboardStats } from "../hooks/useDashboardStats";

const Dashboard = () => {
  const {
    tasks,
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
    pieData,
    barData,
  } = useDashboardStats();

  return (
    <div style={{ padding: "30px", width: "100%", backgroundColor: "#F8FAFC", minHeight: "100vh", boxSizing: "border-box" }}>
      <h2 style={{ marginBottom: "25px", color: "#1E293B", fontWeight: "700" }}>Dashboard Overview 🚀</h2>

      {/* Top Count Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", flex: 1, minWidth: "200px", border: "1px solid #E2E8F0" }}>
          📋 Total Tasks: <b style={{ color: "#1E293B" }}>{totalTasks}</b>
        </div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", flex: 1, minWidth: "200px", border: "1px solid #E2E8F0" }}>
          ⏳ Pending: <b style={{ color: "#9333EA" }}>{pendingTasks}</b>
        </div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", flex: 1, minWidth: "200px", border: "1px solid #E2E8F0" }}>
          🔄 In Progress: <b style={{ color: "#0EA5E9" }}>{inProgressTasks}</b>
        </div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", flex: 1, minWidth: "200px", border: "1px solid #E2E8F0" }}>
          ✅ Completed: <b style={{ color: "#22C55E" }}>{completedTasks}</b>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
        <div style={{ flex: 1, minWidth: "300px", background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: "16px", color: "#1E293B", marginBottom: "15px" }}>Task Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, minWidth: "300px", background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: "16px", color: "#1E293B", marginBottom: "15px" }}>Task Priority Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#F97316" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tasks Table Section */}
      <div style={{ background: "#fff", padding: "25px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ margin: 0, color: "#1E293B", fontSize: "18px", fontWeight: "700" }}>Recent Tasks</h3>
        </div>
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E2E8F0", color: "#64748B", fontSize: "13px" }}>
                <th style={{ padding: "12px" }}>Name</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Priority</th>
                <th style={{ padding: "12px" }}>Created On</th>
              </tr>
            </thead>
            <tbody>
              {tasks.slice(0, 8).map((task) => (
                <tr key={task._id} style={{ borderBottom: "1px solid #F1F5F9", fontSize: "14px", color: "#334155" }}>
                  <td style={{ padding: "14px 12px", fontWeight: "500" }}>{task.title}</td>
                  
                  {/* Status Badge */}
                  <td style={{ padding: "14px 12px" }}>
                    <span style={{
                      padding: "5px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      backgroundColor: 
                        task.status === "Pending" ? "#F3E8FF" : 
                        task.status === "In Progress" ? "#E0F2FE" : "#DCFCE7",
                      color: 
                        task.status === "Pending" ? "#7E22CE" : 
                        task.status === "In Progress" ? "#0369A1" : "#15803D"
                    }}>
                      {task.status}
                    </span>
                  </td>

                  {/* Priority Badge */}
                  <td style={{ padding: "14px 12px" }}>
                    <span style={{
                      padding: "5px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      backgroundColor: 
                        task.priority === "Low" ? "#DCFCE7" : 
                        task.priority === "Medium" ? "#FEF3C7" : "#FEE2E2",
                      color: 
                        task.priority === "Low" ? "#15803D" : 
                        task.priority === "Medium" ? "#B45309" : "#B91C1C"
                    }}>
                      {task.priority}
                    </span>
                  </td>

                  {/* Created Date */}
                  <td style={{ padding: "14px 12px", color: "#64748B" }}>
                    {task.createdAt ? new Date(task.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#64748B" }}>
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;