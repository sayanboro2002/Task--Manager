const { Router } = require("express");
const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
} = require("../controllers/taskController");


const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.patch("/:id", authMiddleware, updateTaskStatus);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;