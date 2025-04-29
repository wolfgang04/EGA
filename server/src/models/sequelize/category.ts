import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../utils/db";

interface CategoryAttributes {
  id: number;
  name: string;
  description: string;
  image: Blob;
}

type CategoryCreationAttributes = Optional<CategoryAttributes, "id">;

interface CategoryInstance
  extends Model<CategoryAttributes, CategoryCreationAttributes>,
    CategoryAttributes {}

const Category = sequelize.define<CategoryInstance>(
  "Category",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,

    image: DataTypes.BLOB,
  },
  { freezeTableName: true, tableName: "category", timestamps: false }
);

export default Category;
