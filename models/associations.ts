// models/associations.ts

import Order from "./order";
import Shutter from "./shutter";

Order.hasMany(Shutter, {
  foreignKey: "orderId",
  as: "shutters",
});

Shutter.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});
