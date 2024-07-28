import { NextApiRequest, NextApiResponse } from "next";
import sequelize from "../../../models";
import Order from "../../../models/order";
import Shutter from "../../../models/shutter";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    if (req.method === "GET") {
      try {
        const order = await Order.findByPk(id as string, {
          include: { model: Shutter, as: "shutters" },
        });

        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
      } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else if (req.method === "PUT") {
      const { basicInfo, discountInfo, shutter, totalAmount } = req.body;

      const transaction = await sequelize.transaction();

      try {
        const order = await Order.findByPk(id as string);

        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }

        await order.update(
          {
            customerName: basicInfo.customerName,
            staffName: basicInfo.staffName,
            date: basicInfo.date,
            discountType: discountInfo.discountType,
            discount: discountInfo.discount,
            totalAmount: totalAmount,
          },
          { transaction }
        );

        await Shutter.destroy({ where: { orderId: id }, transaction });

        const shutterPromises = shutter.map((shutterItem: any) =>
          Shutter.create(
            {
              shutterName: shutterItem.shutterName,
              width: shutterItem.width,
              height: shutterItem.height,
              area: shutterItem.area,
              orderId: id,
            },
            { transaction }
          )
        );

        await Promise.all(shutterPromises);
        await transaction.commit();

        res.status(200).json({ message: "Order updated successfully" });
      } catch (error) {
        await transaction.rollback();
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else if (req.method === "DELETE") {
      try {
        const order = await Order.findByPk(id as string);

        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }

        await order.update({ isDeleted: true });
        await order.save();

        res.status(200).json({ message: "Order deleted successfully" });
      } catch (error) {
        console.error("Failed to delete order:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.setHeader("Allow", ["GET", "PUT"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} Not Allowed` });
    }
  }
};

export default handler;
