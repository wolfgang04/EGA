import { Router } from "express";
import { createTool, getCategoryTools } from "../controllers/tool.controller";

const router = Router();

router.post("/create", createTool);
router.get("/tools", getCategoryTools);

export default router;
