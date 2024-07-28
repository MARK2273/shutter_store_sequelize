import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";

interface ShutterAttributes {
  id: number;
  orderId: number;
  shutterName: string;
  width: number;
  height: number;
  area: number;
}

interface ShutterCreationAttributes extends Optional<ShutterAttributes, "id"> {}

class Shutter
  extends Model<ShutterAttributes, ShutterCreationAttributes>
  implements ShutterAttributes
{
  public id!: number;
  public orderId!: number;
  public shutterName!: string;
  public width!: number;
  public height!: number;
  public area!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Shutter.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    shutterName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "shutters",
    timestamps: true,
  }
);

export default Shutter;
