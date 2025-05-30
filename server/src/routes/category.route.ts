import { Router } from "express";
import {
  categoriesOverview,
  createCategory,
  getCategories,
} from "../controllers/category.controller";

const router = Router();

router.post("/create", createCategory);
router.get("/categories", getCategories);
router.get("/categoriesOverview", categoriesOverview);

export default router;
