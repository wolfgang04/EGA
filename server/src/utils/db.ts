import { Sequelize } from "sequelize";
import { DATABASE, HOST, PASSWORD, USER } from "../constants";

if (!DATABASE || !USER || !PASSWORD) {
  throw new Error("Database configuration variables are missing.");
}

export const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: "postgres",
  logging: false,
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};
