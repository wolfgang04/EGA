import { DataTypes, STRING } from "sequelize";
import User from "./user";
import { sequelize } from "../../utils/db";

const Profile = sequelize.define(
  "Profile",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name.first_name",
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name.middle_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name.last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    image: {
      type: DataTypes.BLOB,
    },
    userID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      field: "user_auth_id",
    },
  },
  { freezeTableName: true, tableName: "profile" }
);

export default Profile;
