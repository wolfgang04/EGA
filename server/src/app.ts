import express from "express";
import cors from "cors";
import session from "express-session";
import { CLIENT_URL, SECRET } from "./constants";
import { Sequelize } from "sequelize";
import { sequelize } from "./utils/db";

const app: express.Application = express();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(
  session({
    name: "qid",
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
    secret: SECRET || "default secret",
    resave: false,
  })
);

export default app;
