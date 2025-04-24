import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers);
router.get("/userID", getUser);

export default router;
