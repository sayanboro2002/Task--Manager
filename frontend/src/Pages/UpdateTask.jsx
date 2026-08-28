import React from "react";
import MemberSelectModal from "../Components/MemberSelectModal";
import TaskChecklist from "../Components/TaskChecklist";
import { useUpdateTaskForm } from "../hooks/useUpdateTaskForm";

export default function UpdateTask() {
  const {
    title, setTitle,
    description, setDescription,
    priority, setPriority,
    duration, setDuration,
    checklistText, setChecklistText,
    checklist,
    members,
    selectedUsers,
    isModalOpen, setIsModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    handleAddChecklistItem,
    handleRemoveChecklistItem,
    handleToggleChecklist,
    handleCheckboxChange,
    handleSubmit,
    handleDeleteTask
  } = useUpdateTaskForm();

  return (
    <div style={{ flex: 1, padding: "20px", overflowY: "auto", backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      <div style={{ background: "#fff", padding: "25px", borderRadius: "12px", maxWidth: "550px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", margin: "0 auto", position: "relative" }}>
        
        {/* Top Header & Delete Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h3 style={{ fontWeight: "700", color: "#1E293B", margin: 0, fontSize: "18px" }}>Update Task</h3>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FEE2E2", padding: "6px 12px", borderRadius: "6px", fontWeight: "600", fontSize: "12px", cursor: "pointer" }}
          >
            🗑 Delete
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Task Title */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", marginBottom: "6px", display: "block", color: "#475569" }}>Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #E2E8F0", outline: "none", fontSize: "13px", boxSizing: "border-box" }}
              required
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", marginBottom: "6px", display: "block", color: "#475569" }}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #E2E8F0", height: "80px", outline: "none", fontSize: "13px", resize: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* Grid Layout for Priority and Due Date */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", marginBottom: "6px", display: "block", color: "#475569" }}>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #E2E8F0", outline: "none", backgroundColor: "#fff", fontSize: "13px", cursor: "pointer", boxSizing: "border-box" }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", marginBottom: "6px", display: "block", color: "#475569" }}>Due Date</label>
              <input
                type="date"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #E2E8F0", outline: "none", backgroundColor: "#fff", fontSize: "13px", color: "#475569", cursor: "pointer", boxSizing: "border-box" }}
              />
            </div>
          </div>

          {/* Assign To */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", marginBottom: "6px", display: "block", color: "#475569" }}>Assign To</label>
            <div 
              onClick={() => setIsModalOpen(true)}
              style={{ 
                width: "100%", 
                padding: "10px", 
                borderRadius: "6px", 
                border: "1px solid #E2E8F0", 
                backgroundColor: "#fff", 
                fontSize: "13px", 
                cursor: "pointer", 
                boxSizing: "border-box", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                minHeight: "40px" 
              }}
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
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "2px solid #fff",
                              marginLeft: index > 0 ? "-8px" : "0px",
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=User";
                            }}
                          />
                        );
                      })}
                  </div>

                  {selectedUsers.length > 3 && (
                    <span style={{ fontSize: "11px", fontWeight: "600", color: "#475569" }}>
                      +{selectedUsers.length - 3}
                    </span>
                  )}
                </div>
              ) : (
                <span style={{ color: "#94A3B8" }}>Select Members</span>
              )}

              <span style={{ color: "#94A3B8", fontSize: "12px" }}>▼</span>
            </div>
          </div>

          {/* TODO Checklist Component */}
          <div style={{ marginBottom: "14px" }}>
            <TaskChecklist
              checklist={checklist}
              checklistText={checklistText}
              setChecklistText={setChecklistText}
              handleAddChecklistItem={handleAddChecklistItem}
              handleRemoveChecklistItem={handleRemoveChecklistItem}
              handleToggleChecklist={handleToggleChecklist}
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            style={{ width: "100%", backgroundColor: "#EFF6FF", color: "#1D4ED8", padding: "11px", border: "none", borderRadius: "6px", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}
          >
            UPDATE TASK
          </button>
        </form>
      </div>

      {/* Member Select Modal */}
      {isModalOpen && (
        <MemberSelectModal
          members={members}
          selectedUsers={selectedUsers}
          onToggleMember={handleCheckboxChange}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal (Smaller & Compact Size) */}
      {isDeleteModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", width: "280px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
            <h4 style={{ fontWeight: "700", color: "#1E293B", marginBottom: "8px", fontSize: "16px" }}>Delete Task</h4>
            <p style={{ color: "#64748B", fontSize: "12px", marginBottom: "16px" }}>Are you sure you want to delete this task?</p>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                style={{ padding: "6px 14px", backgroundColor: "#F1F5F9", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer", color: "#334155", fontSize: "12px" }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTask}
                style={{ padding: "6px 14px", backgroundColor: "#DC2626", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: "12px" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}