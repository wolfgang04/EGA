import { Router } from "express";
import {
  createAccount,
  login,
  logout,
  resetDefaultPass,
} from "../controllers/auth.controller";

const router = Router();

router.post("/createAccount", createAccount);
router.post("/login", login);
router.post("/resetDefaultPass", resetDefaultPass);
router.post("/logout", logout);

export default router;
