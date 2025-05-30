import { Router } from "express";
import {
  createTool,
  editTool,
  getCategoryTools,
  getTools,
} from "../controllers/tool.controller";

const router = Router();

router.post("/create", createTool);
router.get("/tools/:id", getCategoryTools);
router.get("/all", getTools);
router.post("/edit/:id", editTool);

export default router;
