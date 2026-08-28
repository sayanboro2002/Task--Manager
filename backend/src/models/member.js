const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, default: "" },
    pendingCount: { type: Number, default: 0 },
    inProgressCount: { type: Number, default: 0 },
    completedCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;