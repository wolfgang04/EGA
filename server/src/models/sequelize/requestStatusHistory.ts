import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../utils/db";
import Profile from "./profile";
import Request from "./request";

enum Status {
  pending = "pending",
  approved = "approved",
  borrowed = "borrowed",
  returned = "returned",
}

interface RequestHistoryAttributes {
  id: number;
  status: Status;
  changedBy: number;
  requestID: number;
}

type RequestHistoryCreationAttributes = Optional<
  RequestHistoryAttributes,
  "id" | "status"
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
      field: "request_id",
    },
  },
  {
    freezeTableName: true,
    tableName: "request_status_history",
    timestamps: false,
  }
);

export default RequestHistory;
