import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/db";

const Request = sequelize.define(
  "Request",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    publicID: {
      type: DataTypes.STRING,
      defaultValue: "",
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { freezeTableName: true, tableName: "request" }
);

export default Request;
