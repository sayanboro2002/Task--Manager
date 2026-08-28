import React from "react";
import { useNavigate } from "react-router-dom";
import TaskAssignees from "./TaskAssigness"; 

export default function TaskCard({ task, setRefresh }) {
  const navigate = useNavigate();

  if (!task) return null;

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "High": return "bg-danger text-white";
      case "Medium": return "bg-warning text-dark";
      default: return "bg-success text-white";
    }
  };

  const getBorderColor = (status) => {
    switch (status) {
      case "In Progress": return "#0EA5E9";
      case "Completed": return "#10B981";
      default: return "#8B5CF6";
    }
  };

  const calculateProgress = () => {
    if (task?.checklist && task.checklist.length > 0) {
      const total = task.checklist.length;
      const completed = task.checklist.filter(item => item.completed).length;
      return Math.round((completed / total) * 100);
    }
    return task?.status === "Completed" ? 100 : task?.status === "In Progress" ? 50 : 0;
  };

  const progressPercent = calculateProgress();

  return (
    <div 
      className="task-card-item p-3 mb-3 bg-white rounded-3 shadow-sm border"
      style={{ borderLeft: `4px solid ${getBorderColor(task?.status)}`, transition: "all 0.2s ease" }}
    >
      {/* Top Badges */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className={`badge px-2 py-1 ${getPriorityBadgeClass(task?.priority)}`} style={{ fontSize: "11px" }}>
          {task?.priority || "Low"} Priority
        </span>
        <span className="badge bg-light text-secondary border" style={{ fontSize: "11px" }}>
          {task?.status || "Pending"}
        </span>
      </div>

      {/* Title & Description */}
      <h6 className="fw-bold text-dark mb-1" style={{ fontSize: "15px" }}>{task?.title || "No Title"}</h6>
      <p className="text-muted small mb-3" style={{ fontSize: "13px", lineHeight: "1.4" }}>
        {task?.description || "No description provided."}
      </p>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="d-flex justify-content-between text-muted" style={{ fontSize: "11px", marginBottom: "3px" }}>
          <span>Progress</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="progress" style={{ height: "5px" }}>
          <div className="progress-bar" role="progressbar" style={{ width: `${progressPercent}%`, backgroundColor: getBorderColor(task?.status) }}></div>
        </div>
      </div>

      {/* Dates Row */}
      <div className="d-flex justify-content-between pt-2 pb-2 border-top border-bottom text-muted" style={{ fontSize: "11px" }}>
        <div>
          <span className="d-block text-secondary fw-semibold">Start Date</span>
          <span className="text-dark fw-medium">{task?.startDate || "N/A"}</span>
        </div>
        <div className="text-end">
          <span className="d-block text-secondary fw-semibold">Due Date</span>
          <span className="text-dark fw-medium">{task?.duration || "N/A"}</span>
        </div>
      </div>

      {/* Card Footer: Assignees on left, Edit Icon right under Due Date */}
      <div className="d-flex justify-content-between align-items-center pt-3">
        {/* Task Assignees avatars */}
        <TaskAssignees assignedUsers={task.assignedUsers} />

        {/* Edit Button / Icon placed right of the assignees and under due date area */}
        <button
          className="btn btn-sm btn-light border text-primary d-flex align-items-center justify-content-center shadow-sm"
          style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          onClick={() => navigate(`/update-task/${task._id}`)}
          title="Edit Task"
        >
          <i className="bx bx-edit-alt" style={{ fontSize: "16px" }}></i>
        </button>
      </div>
    </div>
  );
}