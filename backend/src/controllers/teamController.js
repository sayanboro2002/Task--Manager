const Member = require("../models/member");
const Task = require("../models/task");

// Get all team members with dynamic task counts
const getTeamMembers = async (req, res) => {
  try {
    const members = await Member.find().lean();

    const membersWithCounts = await Promise.all(
      members.map(async (member) => {
        const memberId = member._id;

        const pendingCount = await Task.countDocuments({ assignedUsers: memberId, status: "Pending" });
        const inProgressCount = await Task.countDocuments({ assignedUsers: memberId, status: "In Progress" });
        const completedCount = await Task.countDocuments({ assignedUsers: memberId, status: "Completed" });

        return {
          ...member,
          pendingCount,
          inProgressCount,
          completedCount,
        };
      })
    );

    res.status(200).json(membersWithCounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new member
const addTeamMember = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    const newMember = new Member({ name, email, avatar });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a member
const deleteTeamMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTeamMembers,
  addTeamMember,
  deleteTeamMember,
};