import { NextApiRequest, NextApiResponse } from "next";
import Shutter from "../../models/shutter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("API route called with method:", req.method);
  console.log("Request body:", req.body);

  if (req.method === "POST") {
    const { totalAmount, discountInfo, shutter, basicInfo } = req.body;

    try {
      const shutterPromises = shutter.map((shutter: any) => {
        console.log("Creating shutter:", {
          staffName: basicInfo.staffName,
          customerName: basicInfo.customerName,
          date: basicInfo.date,
          shutterName: shutter.shutterName,
          width: shutter.width,
          height: shutter.height,
          area: shutter.area,
          discountType: discountInfo.discountType,
          discount: discountInfo.discount,
          totalAmount: totalAmount,
        });

        return Shutter.create({
          staffName: basicInfo.staffName,
          customerName: basicInfo.customerName,
          date: basicInfo.date,
          shutterName: shutter.shutterName,
          width: shutter.width,
          height: shutter.height,
          area: shutter.area,
          discountType: discountInfo.discountType,
          discount: discountInfo.discount,
          totalAmount: totalAmount,
        });
      });

      await Promise.all(shutterPromises);
      res.status(201).json({ message: "Shutters created successfully" });
    } catch (error) {
      console.error("Error creating shutters:", error);
      res.status(500).json({ error: "Failed to create shutters" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
