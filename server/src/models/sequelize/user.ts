import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/db";

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: DataTypes.STRING,
    userType: {
      type: DataTypes.ENUM("admin", "employee"),
      allowNull: false,
      field: "user_type",
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  { freezeTableName: true, tableName: "user_auth" }
);

export default User;
