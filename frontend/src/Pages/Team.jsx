import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTeam } from "../hooks/useTeam";

export default function Team() {
  const {
    members,
    showModal,
    setShowModal,
    formData,
    handleChange,
    handleSubmit,
    downloadTeamReport,
  } = useTeam();

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0">Team Members</h4>
        
        {/* Buttons Section */}
        <div className="d-flex gap-2">
          <button
            onClick={downloadTeamReport}
            className="btn btn-success btn-sm px-3 rounded-3 d-flex align-items-center gap-1"
            style={{ backgroundColor: "#10B981", border: "none" }}
          >
            <i className="bx bx-file"></i> Download Report
          </button>

          <button 
            className="btn btn-success btn-sm px-3 rounded-3"
            onClick={() => setShowModal(true)}
          >
            + Add Team Member
          </button>
        </div>
      </div>

      <div className="row g-3">
        {members.map((member) => (
          <div key={member._id} className="col-md-4">
            <div className="card border-0 shadow-sm p-3 rounded-4 bg-white">
              <div className="d-flex align-items-center mb-3">
                <img
                  src={member.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + member.name}
                  alt={member.name}
                  className="rounded-circle me-3"
                  style={{ width: "45px", height: "45px", objectFit: "cover" }}
                />
                <div className="text-truncate">
                  <h6 className="mb-0 fw-bold">{member.name}</h6>
                  <small className="text-muted">{member.email}</small>
                </div>
              </div>
              <div className="bg-light p-2 rounded-3 d-flex justify-content-around text-center">
                <div>
                  <h6 className="mb-0 text-primary fw-bold">{member.pendingCount || 0}</h6>
                  <small className="text-muted" style={{ fontSize: "11px" }}>Pending</small>
                </div>
                <div>
                  <h6 className="mb-0 text-info fw-bold">{member.inProgressCount || 0}</h6>
                  <small className="text-muted" style={{ fontSize: "11px" }}>In Progress</small>
                </div>
                <div>
                  <h6 className="mb-0 text-success fw-bold">{member.completedCount || 0}</h6>
                  <small className="text-muted" style={{ fontSize: "11px" }}>Completed</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Team Member Modal */}
      {showModal && (
        <div 
          className="modal d-block bg-dark bg-opacity-50" 
          style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 p-3 bg-white">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Add Team Member</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small text-muted">Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success">Save Member</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}