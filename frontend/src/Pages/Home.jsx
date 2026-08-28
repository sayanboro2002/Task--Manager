import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../Components/TaskCard";
import { downloadTaskReport } from "../Utils/exportUtils"; 

export default function Main() {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [refresh, setRefresh] = useState(false);

  // 1. Fetch all tasks with token authentication
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        
        const response = await axios.get("http://localhost:3001/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        
        const tasks = response.data;
        setAllTasks(tasks);
        setFilteredTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [refresh]);

  // 2. Tab filter handler (All, Pending, In Progress, Completed)
  const handleTabChange = (status) => {
    setActiveTab(status);
    if (status === "All") {
      setFilteredTasks(allTasks);
    } else {
      setFilteredTasks(allTasks.filter((task) => task.status === status));
    }
  };

  // Function to count tasks based on status
  const countStatus = (status) => {
    if (status === "All") return allTasks.length;
    return allTasks.filter(t => t.status === status).length;
  };

  return (
    <div style={{ width: "100%", padding: "25px", flex: 1, backgroundColor: "#F8FAFC", overflowY: "auto", minHeight: "100vh", boxSizing: "border-box" }}>
      
      {/* Header Section: My Tasks Title & Download Report Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", width: "100%" }}>
        <h3 className="fw-bold text-dark m-0">My Tasks</h3>
        <button
          onClick={() => downloadTaskReport(allTasks)}
          className="btn btn-success d-flex align-items-center gap-2"
          style={{ backgroundColor: "#10B981", border: "none", fontWeight: "600", fontSize: "14px", padding: "10px 16px", borderRadius: "8px", cursor: "pointer" }}
        >
          <i className="bx bx-file fs-5"></i> Download Report
        </button>
      </div>

      {/* Filter Tabs (All, Pending, In Progress, Completed) */}
      <div className="d-flex align-items-center gap-2 mb-4 flex-wrap" style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "15px" }}>
        {[
          { name: "All", label: "All" },
          { name: "Pending", label: "Pending" },
          { name: "In Progress", label: "In Progress" },
          { name: "Completed", label: "Completed" }
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabChange(tab.name)}
            className={`btn btn-sm px-3 py-2 rounded-pill fw-semibold d-flex align-items-center gap-2 ${
              activeTab === tab.name ? "btn-dark" : "btn-light text-secondary border"
            }`}
            style={{ fontSize: "13px" }}
          >
            {tab.label} 
            <span className={`badge ${activeTab === tab.name ? "bg-secondary text-white" : "bg-white text-dark border"}`} style={{ fontSize: "11px" }}>
              {countStatus(tab.name)}
            </span>
          </button>
        ))}
      </div>

      {/* Tasks Grid Layout */}
      <div className="row g-4">
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const taskId = task._id ? String(task._id) : Math.random().toString();
            return (
              <div className="col-md-4 col-sm-6 col-12" key={taskId}>
                <TaskCard task={task} setRefresh={setRefresh} />
              </div>
            );
          })
        ) : (
          <div className="text-center py-5 text-muted">
            <p>No tasks found in this section.</p>
          </div>
        )}
      </div>

    </div>
  );
}