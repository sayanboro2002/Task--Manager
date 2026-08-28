import React from "react";

export default function TaskChecklist({
  checklist,
  checklistText,
  setChecklistText,
  handleAddChecklistItem,
  handleRemoveChecklistItem,
  handleToggleChecklist,
}) {
  return (
    <div style={{ marginBottom: "25px" }}>
      <label style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>
        TODO Checklist
      </label>
      
      {checklist.map((item, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#F8FAFC", borderRadius: "8px", border: "1px solid #E2E8F0", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
            {/* Checklist item checkbox */}
            <input 
              type="checkbox" 
              checked={item.completed} 
              onChange={() => handleToggleChecklist(index)} 
              style={{ cursor: "pointer", width: "16px", height: "16px" }}
            />
            {/* Strikethrough style on completion */}
            <span style={{ fontSize: "14px", color: item.completed ? "#94A3B8" : "#334155", textDecoration: item.completed ? "line-through" : "none" }}>
              {item.title}
            </span>
          </div>
          <button type="button" onClick={() => handleRemoveChecklistItem(index)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: "16px" }}>🗑</button>
        </div>
      ))}

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Enter Task"
          value={checklistText}
          onChange={(e) => setChecklistText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddChecklistItem();
            }
          }}
          style={{ flex: 1, padding: "11px", borderRadius: "8px", border: "1px solid #E2E8F0", outline: "none", fontSize: "14px", boxSizing: "border-box" }}
        />
        <button
          type="button"
          onClick={handleAddChecklistItem}
          style={{ padding: "10px 18px", backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "8px", fontWeight: "600", cursor: "pointer", color: "#334155" }}
        >
          + Add
        </button>
      </div>
    </div>
  );
}