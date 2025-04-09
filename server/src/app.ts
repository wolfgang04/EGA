import express from "express";
import cors from "cors";
import { CLIENT_URL } from "./constants";

const app: express.Application = express();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

export default app;
