import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/db";
import Category from "./category";

const Tool = sequelize.define(
  "Tool",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryID: {
      type: DataTypes.BIGINT,
      references: {
        model: Category,
        key: "id",
      },
      field: "category_id",
    },
    publicID: {
      type: DataTypes.STRING,
      field: "public_id",
    },
  },
  { freezeTableName: true, tableName: "tool", timestamps: false }
);

export default Tool;
