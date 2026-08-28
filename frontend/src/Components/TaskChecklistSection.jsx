import React from "react";

export default function TaskChecklistSection({
  checklistText,
  setChecklistText,
  checklist,
  handleAddChecklistItem,
  handleRemoveChecklistItem,
}) {
  return (
    <div style={{ marginBottom: "25px" }}>
      <label style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "block", color: "#475569" }}>
        TODO Checklist
      </label>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter Task item"
          value={checklistText}
          onChange={(e) => setChecklistText(e.target.value)}
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #E2E8F0", outline: "none", fontSize: "14px", boxSizing: "border-box" }}
        />
        <button
          type="button"
          onClick={handleAddChecklistItem}
          style={{ padding: "10px 18px", backgroundColor: "#E2E8F0", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", color: "#334155" }}
        >
          + Add
        </button>
      </div>

      {checklist.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
          {checklist.map((item, index) => (
            <li key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#F1F5F9", borderRadius: "6px", fontSize: "13px", color: "#334155" }}>
              <span>• {item.title}</span>
              <button
                type="button"
                onClick={() => handleRemoveChecklistItem(index)}
                style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontWeight: "bold" }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}