const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    startDate: { type: String, default: "" },
    duration: { type: String, default: "" },    
    
    
    checklist: [
      {
        title: { type: String, required: true },
        completed: { type: Boolean, default: false }
      }
    ],

    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
      }
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;