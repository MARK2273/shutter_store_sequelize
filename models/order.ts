import { DataTypes } from "sequelize";
import Shutter from "./shutter";
import sequelize from ".";

const Order = sequelize.define("Order", {
  customerName: { type: DataTypes.STRING, allowNull: false },
  staffName: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  discountType: { type: DataTypes.STRING, allowNull: false },
  discount: { type: DataTypes.FLOAT, allowNull: false },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false }, // Add this line
  isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // Add this line
});

Order.hasMany(Shutter, { foreignKey: "orderId", as: "shutters" });
Shutter.belongsTo(Order, { foreignKey: "orderId", as: "order" });

export default Order;
