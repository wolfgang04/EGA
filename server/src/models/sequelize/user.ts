import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../utils/db";

interface UserAttributes {
  id: number;
  public_id: string;
  password: string;
  userType: "admin" | "employee";
  created_by: number | null;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "public_id">;

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = sequelize.define<UserInstance>(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    public_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    userType: {
      type: DataTypes.ENUM("admin", "employee"),
      allowNull: false,
      field: "user_type",
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  { freezeTableName: true, tableName: "user_auth", timestamps: false }
);

export default User;
