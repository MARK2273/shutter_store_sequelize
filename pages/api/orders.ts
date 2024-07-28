// pages/api/orders.ts or in the main server file

import type { NextApiRequest, NextApiResponse } from "next";
import "../../models/associations"; // Ensure this is imported to set up associations
import Order from "../../models/order";
import Shutter from "../../models/shutter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: Shutter,
            as: "shutters",
          },
        ],
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
