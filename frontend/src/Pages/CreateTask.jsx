import React from "react";
import MemberSelectModal from "../Components/MemberSelectModal";
import TaskChecklistSection from "../Components/TaskChecklistSection";
import { useTaskForm } from "../hooks/useTaskForm";

export default function CreateTask() {
  const {
    title, setTitle,
    description, setDescription,
    priority, setPriority,
    startDate, setStartDate,
    duration, setDuration,
    checklistText, setChecklistText,
    checklist,
    members,
    selectedUsers,
    isModalOpen, setIsModalOpen,
    handleAddChecklistItem,
    handleRemoveChecklistItem,
    handleCheckboxChange,
    handleSubmit
  } = useTaskForm();

  return (
    <div style={{ flex: 1, padding: "40px", overflowY: "auto", backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      <div style={{ background: "#fff", padding: "35px", borderRadius: "12px", maxWidth: "800px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", margin: "0 auto" }}>
        <h3 style={{ marginBottom: "25px", fontWeight: "700", color: "#1E293B" }}>Create Task</h3>
        
        <form onSubmit={handleSubmit}>
          {/* Task Title */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>Task Title</label>
            <input
              type="text"
              placeholder="Create App UI"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0", outline: "none", fontSize: "14px", boxSizing: "border-box" }}
              required
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>Description</label>
            <textarea
              placeholder="Describe task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0", height: "120px", outline: "none", fontSize: "14px", resize: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* Grid Layout: Priority, Start Date, Due Date & Assign To */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            {/* Priority */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0", outline: "none", backgroundColor: "#fff", fontSize: "14px", cursor: "pointer", boxSizing: "border-box" }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ width: "100%", padding: "11px", borderRadius: "8px", border: "1px solid #E2E8F0", outline: "none", backgroundColor: "#fff", fontSize: "14px", color: "#475569", cursor: "pointer", boxSizing: "border-box" }}
              />
            </div>

            {/* Due Date */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>Due Date</label>
              <input
                type="date"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={{ width: "100%", padding: "11px", borderRadius: "8px", border: "1px solid #E2E8F0", outline: "none", backgroundColor: "#fff", fontSize: "14px", color: "#475569", cursor: "pointer", boxSizing: "border-box" }}
              />
            </div>

            {/* Assign To */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>Assign To</label>
              <div 
                onClick={() => setIsModalOpen(true)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2E8F0", backgroundColor: "#fff", fontSize: "14px", cursor: "pointer", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", height: "45px" }}
              >
                {selectedUsers && selectedUsers.length > 0 ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {members
                        .filter((m) => selectedUsers.includes(m._id || m.id))
                        .slice(0, 3)
                        .map((member, index) => {
                          const avatarSrc = member.profilePic 
                            ? `http://localhost:3001/${member.profilePic.replace(/\\/g, "/")}` 
                            : (member.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + member.name);
                          
                          return (
                            <img
                              key={member._id || member.id}
                              src={avatarSrc}
                              alt={member.name}
                              style={{ width: "26px", height: "26px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff", marginLeft: index > 0 ? "-10px" : "0px" }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=User";
                              }}
                            />
                          );
                        })}
                    </div>
                    {selectedUsers.length > 3 && (
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>+{selectedUsers.length - 3}</span>
                    )}
                  </div>
                ) : (
                  <span style={{ color: "#94A3B8" }}>Select Members</span>
                )}
                <span style={{ color: "#94A3B8", fontSize: "12px" }}>▼</span>
              </div>
            </div>
          </div>

          {/* Checklist Component Integration */}
          <TaskChecklistSection
            checklistText={checklistText}
            setChecklistText={setChecklistText}
            checklist={checklist}
            handleAddChecklistItem={handleAddChecklistItem}
            handleRemoveChecklistItem={handleRemoveChecklistItem}
          />

          {/* Create Task Button */}
          <button
            type="submit"
            style={{ width: "100%", backgroundColor: "#EFF6FF", color: "#1D4ED8", padding: "14px", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "all 0.2s" }}
          >
            CREATE TASK
          </button>
        </form>
      </div>

      {isModalOpen && (
        <MemberSelectModal
          members={members}
          selectedUsers={selectedUsers}
          onToggleMember={handleCheckboxChange}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}