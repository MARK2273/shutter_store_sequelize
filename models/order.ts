import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";

interface OrderAttributes {
  id: number;
  customerName: string;
  staffName: string;
  date: Date;
  discountType: string;
  discount: number;
  totalAmount: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public customerName!: string;
  public staffName!: string;
  public date!: Date;
  public discountType!: string;
  public discount!: number;
  public totalAmount!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staffName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
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
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;
