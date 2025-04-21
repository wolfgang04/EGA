import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/db";

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,

    image: DataTypes.BLOB,
  },
  { freezeTableName: true, tableName: "category" }
);

export default Category;
