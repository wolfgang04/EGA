import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../utils/db";

interface RequestAttributes {
  id: number;
  publicID: string;
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
  },
  { freezeTableName: true, tableName: "request", timestamps: false }
);

export default Request;
