import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/db";
import Tool from "./tool";
import Request from "./request";

const RequestTool = sequelize.define(
  "RequestTool",
  {
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
      },
    },
    note: DataTypes.TEXT,
    toolID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Tool,
        key: "id",
      },
    },
    requestID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Request,
        key: "id",
      },
    },
  },
  { freezeTableName: true, tableName: "request_tool" }
);

export default RequestTool;
