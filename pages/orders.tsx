import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/slices/orderSlice";
import { RootState } from "@/redux/store";
import { fetchOrders } from "../redux/actions/orderAction";
import { formatOrderData } from "@/utils/orderDataFormater";
function OrdersPage({ socket }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders() as any);
    socket.on("newOrder", (newOrderData: any) => {
      const newOrder = formatOrderData(newOrderData.productsInOrder);
      dispatch(addOrder(newOrder));
    });

    return () => {
      socket.off("newOrder");
    };
  }, [socket]);

  const orders = useSelector((state: RootState) => state.order);
  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-semibold mb-4">Órdenes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order, index) => (
          <div key={order.order_id} className="border p-4">
            <h2 className="text-xl font-semibold">Orden #{order.order_id}</h2>
            <p>status: {order.orderStatusId}</p>
            <p>Nombre: {order.orderName}</p>
            <p>Dirección: {order.orderAddress}</p>
            <p>Teléfono: {order.orderPhone}</p>
            <h3 className="text-lg font-semibold">Productos:</h3>
            <ul>
              {order.products.map((product: any, index: number) => (
                <li key={index}>
                  {product.productName} - Cantidad: {product.quantity} - Precio:
                  ${product.productPrice}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
