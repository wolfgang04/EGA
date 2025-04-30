import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../utils/db";
import Profile from "./profile";

interface RequestAttributes {
  id: number;
  publicID: string;
  requestBy: number;
}

type RequestCreationAttributes = Optional<RequestAttributes, "id" | "publicID">;

interface RequestInstance
  extends Model<RequestAttributes, RequestCreationAttributes>,
    RequestAttributes {}

const Request = sequelize.define<RequestInstance>(
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
      field: "public_id",
    },
    requestBy: {
      type: DataTypes.BIGINT,
      field: "request_by",
      allowNull: false,
      references: {
        model: Profile,
        key: "id",
      },
    },
  },
  { freezeTableName: true, tableName: "request", timestamps: false }
);

export default Request;
