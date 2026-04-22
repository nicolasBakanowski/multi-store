"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { formatOrderData } from "@/utils/orderDataFormater";
import {
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_INPROCCESS,
  ORDER_STATUS_REJECTED,
} from "@/constants/orderConstants";
import socket from "@/socket/socketConfig";
import { changeOrderStatus } from "@/app/actions/order";

type Status = { id: number; name: string };

export default function OrdersClient({
  initialOrdersRaw,
  initialStatus,
}: {
  initialOrdersRaw: any[];
  initialStatus: Status[];
}) {
  const userRole = useSelector((state: RootState) => state.user.user?.roleId);
  const token = useSelector((state: RootState) => state.user.token);

  const [selectedStatus, setSelectedStatus] = useState(1);
  const [orders, setOrders] = useState<any[]>(
    Array.isArray(initialOrdersRaw) ? formatOrderData(initialOrdersRaw) : []
  );

  useEffect(() => {
    socket.on("newOrder", (newOrderData: any) => {
      const newOrder = formatOrderData(newOrderData.productsInOrder);
      setOrders((prev) => [...newOrder, ...prev]);
    });
    socket.on("orderStatusChanged", (orderupdated: any) => {
      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === orderupdated.id
            ? { ...o, orderStatusId: orderupdated.statusId }
            : o
        )
      );
    });
    return () => {
      socket.off("newOrder");
      socket.off("orderStatusChanged");
    };
  }, []);

  const filteredOrders = useMemo(
    () => orders.filter((o) => o.orderStatusId === selectedStatus),
    [orders, selectedStatus]
  );

  if (userRole !== 1) {
    return <div>No tienes acceso a esta página.</div>;
  }

  const handleConfirmOrder = async (orderId: number, OrderStatus: number) => {
    if (!token) return;
    const order = await changeOrderStatus({ orderId, statusId: OrderStatus, token });
    setOrders((prev) =>
      prev.map((o) =>
        o.order_id === order.id ? { ...o, orderStatusId: order.statusId } : o
      )
    );
  };

  const handleRejectOrder = async (orderId: number) => {
    if (!token) return;
    const order = await changeOrderStatus({
      orderId,
      statusId: ORDER_STATUS_REJECTED,
      token,
    });
    setOrders((prev) =>
      prev.map((o) =>
        o.order_id === order.id ? { ...o, orderStatusId: order.statusId } : o
      )
    );
  };

  const calculateTotal = (products: any[]) =>
    products.reduce((total, product) => total + product.quantity * product.productPrice, 0);

  return (
    <div className="container mx-auto mt-4">
      <div className="container">
        <div className="mb-4 space-x-4 justify-center md:space-x-20 md:flex md:justify-center">
          {initialStatus.map((item: any) => (
            <button
              key={item.id}
              className={`rounded-full px-3 py-1 text-white ${
                selectedStatus === item.id ? "bg-green-500" : "bg-gray-500"
              }`}
              onClick={() => setSelectedStatus(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <div
            key={order.order_id}
            className="border p-2 bg-gray-900 shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl flex flex-col"
          >
            <div className="text-white rounded-t-lg flex">
              <h2 className="text-lg pl-2 font-semibold">#{order.order_id}</h2>
              <p className="pl-5">
                {order.orderName} - {order.orderAddress}- {order.orderPhone}
              </p>
            </div>
            <div className="border-b  border-gray-400 my-2"></div>
            <div className="flex pl-3 flex-col md:flex-row space-x-4 justify-between">
              <ul className=" text-white flex-grow md:flex-grow-0">
                {order.products.map((product: any, idx: number) => (
                  <li key={idx}>
                    {product.productName} - {product.quantity} - $
                    {product.productPrice}
                  </li>
                ))}
              </ul>
              <div className="text-right pr-3 pb-3">
                <div>
                  <p className="text-sm text-white">
                    Importe Total: ${calculateTotal(order.products)}
                  </p>
                </div>
                <div>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded mt-2 hover:bg-red-600 focus:outline-none"
                    onClick={() => handleRejectOrder(order.order_id)}
                  >
                    Rechazar Pedido
                  </button>
                </div>
                <button
                  className="bg-green-500 text-white py-1 px-2 rounded mt-2 hover:bg-green-600 focus:outline-none"
                  onClick={() => {
                    selectedStatus == 1
                      ? handleConfirmOrder(order.order_id, ORDER_STATUS_CONFIRMED)
                      : handleConfirmOrder(order.order_id, ORDER_STATUS_INPROCCESS);
                  }}
                >
                  {selectedStatus == 1 ? "Confirmar Pedido" : "Preparar Pedido"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

