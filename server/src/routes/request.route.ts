import { Router } from "express";
import {
  changeRequestStatus,
  getRequestUpdates,
  getUserOngoingRequest,
  requestOverview,
  requestTools,
} from "../controllers/request.controller";

const router = Router();

router.post("/create/tools", requestTools);
router.get("/requests", getRequestUpdates);
router.post("/status", changeRequestStatus);
router.get("/overview", requestOverview);
router.get("/ongoing", getUserOngoingRequest);

export default router;
