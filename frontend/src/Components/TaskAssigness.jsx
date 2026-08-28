import React from "react";

export default function TaskAssignees({ assignedUsers }) {
  if (!assignedUsers || assignedUsers.length === 0) {
    return <span className="text-muted" style={{ fontSize: "11px" }}>No members assigned</span>;
  }

  return (
    <div className="d-flex align-items-center">
      {assignedUsers.slice(0, 3).map((user, idx) => {
        const userAvatar = user?.profilePic 
          ? `http://localhost:3001/${user.profilePic.replace(/\\/g, "/")}` 
          : (user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'user'}`);
        
        return (
          <img
            key={user?._id || idx}
            src={userAvatar}
            alt={user?.name || "Member"}
            title={user?.name || "Member"}
            style={{
              width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover",
              border: "2px solid #fff", marginLeft: idx > 0 ? "-8px" : "0px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=User";
            }}
          />
        );
      })}

      {assignedUsers.length > 3 && (
        <span className="ms-1 fw-bold text-secondary" style={{ fontSize: "11px", backgroundColor: "#F1F5F9", padding: "2px 6px", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
          +{assignedUsers.length - 3}
        </span>
      )}
    </div>
  );
}