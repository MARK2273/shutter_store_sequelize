import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ConfirmationModal from "@/components/common/ConfirmationModal";

interface Order {
  id: number;
  customerName: string;
  staffName: string;
  date: string;
  discountType: string;
  discount: number;
  shutters: Shutter[];
}

interface Shutter {
  shutterName: string;
  width: number;
  height: number;
  area: number;
}

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = useCallback((index: number) => {
    setDeleteIndex(index);
    setIsModal(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (deleteIndex !== null) {
      try {
        const orderId = orders[deleteIndex].id;
        const response = await fetch(`/api/orders/${orderId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setOrders((prevOrders) =>
            prevOrders.filter((_, i) => i !== deleteIndex)
          );
        } else {
          console.error("Failed to delete order");
        }
      } catch (error) {
        console.error("Failed to delete order:", error);
      } finally {
        setIsModal(false);
        setDeleteIndex(null);
      }
    }
  }, [deleteIndex, orders]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      {orders.length > 0 ? (
        <table className="bg-white border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Staff Name</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Discount Type</th>
              <th className="py-2 px-4 border-b">Discount</th>
              <th className="py-2 px-4 border-b">Payable Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const totalPrice = order.shutters.reduce(
                (sum, shutter) => sum + shutter.area,
                0
              );
              const discountAmount =
                order.discountType === "percentage"
                  ? (totalPrice * order.discount) / 100
                  : order.discount;
              const payablePrice = totalPrice - discountAmount;

              return (
                <tr key={order.id} className="">
                  <td className="py-2 px-4 border-b">{order.customerName}</td>
                  <td className="py-2 px-4 border-b">{order.staffName}</td>
                  <td className="py-2 px-4 border-b">{order.date}</td>
                  <td className="py-2 px-4 border-b">{totalPrice}</td>
                  <td className="py-2 px-4 border-b capitalize">
                    {order.discountType}
                  </td>
                  <td className="py-2 px-4 border-b">{discountAmount}</td>
                  <td className="py-2 px-4 border-b">{payablePrice}</td>
                  <td className="py-2 px-4 border-b flex gap-2">
                    <Link href={`/?id=${order.id}`}>
                      <button className="bg-blue-500 text-white py-1 px-3 rounded">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500">No data available.</div>
      )}

      {isModal && (
        <ConfirmationModal
          label=""
          message="Are you sure you want to delete this order?"
          onConfirm={confirmDelete}
          onCancel={() => setIsModal(false)}
          setIsModal={setIsModal}
        />
      )}
    </div>
  );
};

export default OrderListPage;
