import { Router } from "express";
import {
  createTool,
  getCategoryTools,
  getTools,
} from "../controllers/tool.controller";

const router = Router();

router.post("/create", createTool);
router.get("/tools", getCategoryTools);
router.get("/all", getTools);

export default router;
