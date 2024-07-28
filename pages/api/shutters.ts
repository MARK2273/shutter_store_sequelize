import { NextApiRequest, NextApiResponse } from "next";
import sequelize from "../../models";
import Order from "../../models/order";
import Shutter from "../../models/shutter";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { basicInfo, discountInfo, shutter, totalAmount } = req.body;

    const transaction = await sequelize.transaction();

    try {
      // Create order
      const newOrder = await Order.create(
        {
          customerName: basicInfo.customerName,
          staffName: basicInfo.staffName,
          date: basicInfo.date,
          discountType: discountInfo.discountType,
          discount: discountInfo.discount,
          totalAmount: totalAmount,
          isDeleted: false,
        },
        { transaction }
      );
      console.log(newOrder, "///////////////////////");

      // Create shutters
      const shutterPromises = shutter.map((shutterItem: any) =>
        Shutter.create(
          {
            shutterName: shutterItem.shutterName,
            width: shutterItem.width,
            height: shutterItem.height,
            area: shutterItem.area,
            orderId: newOrder.dataValues.id,
          },
          { transaction }
        )
      );

      await Promise.all(shutterPromises);

      await transaction.commit();

      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating order and shutters:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
