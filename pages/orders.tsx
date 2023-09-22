import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/slices/orderSlice";
import { RootState } from "@/redux/store";
import { fetchOrders } from "../redux/actions/orderAction";
import { fetchStatus } from "@/redux/actions/statusAction";
import { formatOrderData } from "@/utils/orderDataFormater";

function OrdersPage({ socket }: any) {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(1);

  useEffect(() => {
    dispatch(fetchStatus() as any);
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
  const status = useSelector((state: RootState) => state.status);
  const calculateTotal = (products: any[]) => {
    return products.reduce((total, product) => {
      return total + product.quantity * product.productPrice;
    }, 0);
  };
  const filteredOrders = orders.filter(
    (order) => order.orderStatusId === selectedStatus
  );

  return (
    <div className="container mx-auto mt-4">
      <div className="mb-4 space-x-4 justify-center md:space-x-20 md:flex md:justify-center">
        {status.map((item: any) => (
          <button
            key={item.id}
            className={`rounded-full px-4 py-2 text-white ${
              selectedStatus === item.id ? "bg-green-500" : "bg-gray-500"
            }`}
            onClick={() => setSelectedStatus(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order, index) => (
          <div
            key={order.order_id}
            className="border p-2 bg-gray-900 shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl flex flex-col"
          >
            {/* Sección superior */}
            <div className="text-white rounded-t-lg flex">
              <h2 className="text-lg pl-4font-semibold">#{order.order_id}</h2>
              <p className="pl-5">
                {order.orderName} - {order.orderAddress}
              </p>
            </div>
            <div className="border-b border-gray-400 my-2"></div>
            <ul className="text-sm text-white flex-grow">
              {order.products.map((product: any, index: number) => (
                <li key={index}>
                  {product.productName} - {product.quantity} - $
                  {product.productPrice}
                </li>
              ))}
            </ul>
            <div className="text-right">
              <div>
                <p className="text-sm text-white">
                  Importe Total: ${calculateTotal(order.products)}
                </p>
              </div>
              <div>
                <button className="bg-red-500 text-white py-1 px-2 rounded mt-2 hover:bg-green-600 focus:outline-none">
                  Rechazar
                </button>
              </div>
              <button className="bg-green-500 text-white py-1 px-2 rounded mt-2 hover:bg-green-600 focus:outline-none">
                Confirmar Pedido
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
