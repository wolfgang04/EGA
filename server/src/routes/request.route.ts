import { Router } from "express";
import { requestTools } from "../controllers/request.controller";

const router = Router();

router.post("/create/tools", requestTools);

export default router;
