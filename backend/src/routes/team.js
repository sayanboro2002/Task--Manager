const { Router } = require("express");
const { 
  getTeamMembers, 
  addTeamMember, 
  deleteTeamMember 
} = require("../controllers/teamController");

const router = Router();

router.get("/", getTeamMembers);
router.post("/", addTeamMember);
router.delete("/:id", deleteTeamMember);

module.exports = router;