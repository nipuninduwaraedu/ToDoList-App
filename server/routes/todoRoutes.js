import express from "express";
import { getTodos,createTodo,toggleTodo,deleteTodo }from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect,getTodos);
router.post("/", protect, createTodo);
router.put("/", protect,toggleTodo);
router.delete("/", protect,deleteTodo);

export default router;

