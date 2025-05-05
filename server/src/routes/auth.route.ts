import { Router } from "express";
import {
  authCheck,
  createAccount,
  login,
  logout,
  resetDefaultPass,
} from "../controllers/auth.controller";

const router = Router();

router.post("/create", createAccount);
router.post("/login", login);
router.post("/resetDefaultPass", resetDefaultPass);
router.post("/logout", logout);
router.get("/authCheck", authCheck);

export default router;
