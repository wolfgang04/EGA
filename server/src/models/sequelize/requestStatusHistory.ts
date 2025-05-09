import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../utils/db";
import Profile from "./profile";
import Request from "./request";

enum Status {
  pending = "pending",
  denied = "denied",
  approved = "approved",
  borrowed = "borrowed",
  returned = "returned",
}

interface RequestHistoryAttributes {
  id: number;
  status: Status;
  changedBy: number;
  requestID: number;
  changedAt: Date;
}

type RequestHistoryCreationAttributes = Optional<
  RequestHistoryAttributes,
  "id" | "status" | "changedAt"
>;

interface RequestHistoryInstance
  extends Model<RequestHistoryAttributes, RequestHistoryCreationAttributes>,
    RequestHistoryAttributes {}

const RequestHistory = sequelize.define<RequestHistoryInstance>(
  "RequestStatusHistory",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "denied",
        "approved",
        "borrowed",
        "returned"
      ),
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
      field: "request_id",
    },
    changedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "changed_at",
    },
  },
  {
    freezeTableName: true,
    tableName: "request_status_history",
    timestamps: false,
  }
);

export default RequestHistory;
