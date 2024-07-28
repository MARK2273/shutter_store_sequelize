import { NextApiRequest, NextApiResponse } from "next";
import Order from "../../../models/order";
import Shutter from "../../../models/shutter";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const orders = await Order.findAll({
        where: { isDeleted: false },
        include: [{ model: Shutter, as: "shutters" }],
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
