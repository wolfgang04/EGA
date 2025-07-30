import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

interface PAYLOAD {
  userId: number;
  accType: string;
}

export const issue = (payload: PAYLOAD) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "30m" });

export const verify = (token: string) =>
  jwt.verify(token, JWT_SECRET) as PAYLOAD;
