import { Router } from "express";
import {
  changeRequestStatus,
  getRequestUpdates,
  getUserOngoingRequest,
  prevRequests,
  requestOverview,
  requestTools,
} from "../controllers/request.controller";

const router = Router();

router.post("/create/tools", requestTools);
router.get("/requests", getRequestUpdates);
router.post("/status", changeRequestStatus);
router.get("/overview/:id", requestOverview);
router.get("/ongoing", getUserOngoingRequest);
router.get("/previous", prevRequests);

export default router;
