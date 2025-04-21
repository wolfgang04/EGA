import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/db";
import Profile from "./profile";
import Request from "./request";

const RequestHistory = sequelize.define(
  "RequestStatusHistory",
  {
    status: {
      type: DataTypes.ENUM("pending", "approved", "borrowed", "returned"),
      defaultValue: "pending",
    },
    changedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Profile,
        key: "id",
      },
      field: "changed_by",
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
  { freezeTableName: true, tableName: "request_status_history" }
);

export default RequestHistory;
