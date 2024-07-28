import { NextApiRequest, NextApiResponse } from "next";
import sequelize from "../../models";
import Order from "../../models/order";
import Shutter from "../../models/shutter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("API route called with method:", req.method);
  console.log("Request body:", req.body);

  if (req.method === "POST") {
    const { totalAmount, discountInfo, shutter, basicInfo } = req.body;

    const transaction = await sequelize.transaction();
    try {
      const order = await Order.create(
        {
          staffName: basicInfo.staffName,
          customerName: basicInfo.customerName,
          date: basicInfo.date,
          discountType: discountInfo.discountType,
          discount: discountInfo.discount,
          totalAmount: totalAmount,
        },
        { transaction }
      );

      const shutterPromises = shutter.map((shutter: any) => {
        return Shutter.create(
          {
            orderId: order.id, // Foreign key
            shutterName: shutter.shutterName,
            width: shutter.width,
            height: shutter.height,
            area: shutter.area,
          },
          { transaction }
        );
      });

      await Promise.all(shutterPromises);
      await transaction.commit();

      res
        .status(201)
        .json({ message: "Order and shutters created successfully" });
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating order and shutters:", error);
      res.status(500).json({ error: "Failed to create order and shutters" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
