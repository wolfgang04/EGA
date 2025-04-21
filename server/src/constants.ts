import dotenv from "dotenv";

dotenv.config();

export const CLIENT_URL = process.env.CLIENT_URL;
export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const DB_PORT = parseInt(process.env.DB_PORT!, 10);
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const DATABASE = process.env.DATABASE;
export const SECRET = process.env.SECRET;
