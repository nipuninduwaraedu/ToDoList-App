import express from "express";
import {
  getTodos,
  createTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTodos);
router.post("/", protect, createTodo);
router.put("/:id", protect, updateTodo);
router.patch("/:id/toggle", protect, toggleTodo);
router.delete("/:id", protect, deleteTodo);

export default router;
