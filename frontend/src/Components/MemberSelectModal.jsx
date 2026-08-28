import React, { useState } from "react";

export default function MemberSelectModal({ members = [], selectedUsers = [], onToggleMember, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter((member) =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", width: "480px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        
        {/* Modal Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #E2E8F0" }}>
          <h3 style={{ margin: 0, color: "#1E293B", fontSize: "18px", fontWeight: "700" }}>Select Team Members</h3>
          <button 
            type="button"
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748B", padding: 0 }}
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: "20px 24px" }}>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #E2E8F0", outline: "none", fontSize: "14px", boxSizing: "border-box" }}
          />
          
          {/* Members List */}
          <div style={{ maxHeight: "250px", overflowY: "auto", paddingRight: "5px" }}>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => {
                const memberId = member._id || member.id;
                const isChecked = Array.isArray(selectedUsers) && selectedUsers.includes(memberId);
                
                // Avatar source handling with fallback
                const avatarSrc = member.profilePic 
                  ? `http://localhost:3001/${member.profilePic.replace(/\\/g, "/")}` 
                  : (member.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + member.name);

                return (
                  <div 
                    key={memberId} 
                    onClick={() => onToggleMember(memberId)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "6px", cursor: "pointer", marginBottom: "5px", backgroundColor: isChecked ? "#F1F5F9" : "transparent" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                       <img 
                          src={avatarSrc} 
                          alt={member.name} 
                          style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=User";
                          }}
                       />
                       <div>
                          <div style={{ fontWeight: "600", fontSize: "14px", color: "#1E293B" }}>{member.name}</div>
                          <div style={{ fontSize: "12px", color: "#64748B" }}>{member.email}</div>
                       </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      readOnly
                      style={{ width: "18px", height: "18px", cursor: "pointer", pointerEvents: "none", accentColor: "#2563EB" }}
                    />
                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: "center", color: "#64748B", fontSize: "14px", padding: "20px 0" }}>No members found</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", padding: "16px 24px", borderTop: "1px solid #E2E8F0", background: "#F8FAFC" }}>
          <button 
            type="button"
            onClick={onClose} 
            style={{ padding: "8px 16px", background: "#F1F5F9", color: "#334155", border: "1px solid #CBD5E1", borderRadius: "6px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={onClose} 
            style={{ padding: "8px 20px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}