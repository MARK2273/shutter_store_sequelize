import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";

interface ShutterAttributes {
  id: number;
  staffName: string;
  customerName: string;
  date: Date;
  shutterName: string;
  width: number;
  height: number;
  area: number;
  discountType: string;
  discount: number;
  totalAmount: number;
}

interface ShutterCreationAttributes extends Optional<ShutterAttributes, "id"> {}

class Shutter
  extends Model<ShutterAttributes, ShutterCreationAttributes>
  implements ShutterAttributes
{
  public id!: number;
  public staffName!: string;
  public customerName!: string;
  public date!: Date;
  public shutterName!: string;
  public width!: number;
  public height!: number;
  public area!: number;
  public discountType!: string;
  public discount!: number;
  public totalAmount!: number;

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
    staffName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
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
    discountType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalAmount: {
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
