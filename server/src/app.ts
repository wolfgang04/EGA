import express from "express";
import cors from "cors";
import { CLIENT_URL } from "./constants";
import authRoutes from "./routes/auth.route";
import { authMiddleware } from "./middlewares/auth.middleware";
import userRoutes from "./routes/user.route";
import categoryRoutes from "./routes/category.route";
import toolRoutes from "./routes/tool.route";
import requestRoutes from "./routes/request.route";
import cookieParser from "cookie-parser";

const app: express.Application = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use(authMiddleware);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/tool", toolRoutes);
app.use("/api/request", requestRoutes);

export default app;
