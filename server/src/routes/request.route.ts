import { Router } from "express";
import {
  changeRequestStatus,
  getRequestUpdates,
  requestTools,
} from "../controllers/request.controller";

const router = Router();

router.post("/create/tools", requestTools);
router.get("/requests", getRequestUpdates);
router.post("/status", changeRequestStatus);

export default router;
