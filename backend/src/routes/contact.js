const { Router } = require("express");
const { createContactMessage } = require("../controllers/contactController");

const router = Router();

// POST Route using controller
router.post("/", createContactMessage);

module.exports = router;