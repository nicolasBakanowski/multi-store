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
          <div key={order.order_id} className="border p-4">
            <h2 className="text-xl font-semibold">Orden #{order.order_id}</h2>
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
            <p className="mt-2">
              Importe Total: ${calculateTotal(order.products)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
