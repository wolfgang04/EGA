import { Router } from "express";
import { getUser, getUsers, profile } from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers);
router.get("/profile", profile);

export default router;
