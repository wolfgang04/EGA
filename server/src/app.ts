import express from "express";
import cors from "cors";
import session from "express-session";
import { CLIENT_URL, SECRET } from "./constants";
import authRoutes from "./routes/auth.route";
import { authMiddleware } from "./controllers/middleware.controller";
import userRoutes from "./routes/user.route";
import categoryRoutes from "./routes/category.route";

const app: express.Application = express();

app.set("trust proxy", 1);
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
      maxAge: 1000 * 60 * 20,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
    saveUninitialized: false,
    secret: SECRET || "default secret",
    resave: false,
  })
);

app.use("/api/auth", authRoutes);
app.use(authMiddleware);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);

export default app;
