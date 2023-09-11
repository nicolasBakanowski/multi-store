import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNewOrder } from "../redux/slices/orderSlice";
// Datos ficticios de pedidos con estados
const ordersData: any[] = [
  {
    id: 1,
    customerName: "Cliente 1",
    products: ["Producto A", "Producto B"],
    status: "Pendiente",
  },
  {
    id: 2,
    customerName: "Cliente 2",
    products: ["Producto C", "Producto D"],
    status: "Confirmado",
  },
  {
    id: 3,
    customerName: "Cliente 3",
    products: ["Producto E"],
    status: "En Camino",
  },
  {
    id: 4,
    customerName: "Cliente 4",
    products: ["Producto F", "Producto G"],
    status: "Listo en el Local",
  },
  {
    id: 5,
    customerName: "Cliente 5",
    products: ["Producto H"],
    status: "Devolución",
  },
  {
    id: 6,
    customerName: "Cliente 6",
    products: ["Producto I"],
    status: "Pendiente",
  },
];

function OrdersPage({ socket }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("newOrder", (newOrderData: any) => {
      console.log("Esto es un nuevo pedido:", newOrderData);
      dispatch(setNewOrder(newOrderData));
    });

    return () => {
      socket.off("newOrder");
    };
  }, [socket]);
  const [orders, setOrders] = useState<any[]>(ordersData);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const filteredOrders = selectedStatus
    ? orders.filter((order) => order.status === selectedStatus)
    : orders;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Órdenes para Empleados</h1>
      <div className="mb-4">
        <label className="mr-2">Selecciona el estado:</label>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="px-2 py-1 border rounded"
        >
          <option value="">Todos</option>
          {Array.from(new Set(orders.map((order) => order.status))).map(
            (status) => (
              <option key={status} value={status}>
                {status}
              </option>
            )
          )}
        </select>
      </div>
      <div className="mt-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden mb-4"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                Pedido de {order.customerName}
              </h2>
              <div className="mb-2">
                <strong>Productos:</strong>
                <ul>
                  {order.products.map((product: string, index: number) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <strong>Estado:</strong> {order.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
