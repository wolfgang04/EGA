import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/category.controller";

const router = Router();

router.post("/create", createCategory);
router.get("/categories", getCategories);

export default router;
