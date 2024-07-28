import { NextApiRequest, NextApiResponse } from "next";
import Order from "../../../models/order";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      // Find the order by ID
      const order = await Order.findByPk(id as string);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Perform a soft delete by updating the isDeleted column
      await order.update({ isDeleted: true });
      await order.save();

      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Failed to delete order:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
