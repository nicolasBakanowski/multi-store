import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { createOrderAction } from "@/redux/actions/productAction";
import DeliveryForm from "../components/DeliveryForm";
import { clearCart } from "../redux/slices/cartSlice"; // Asegúrate de ajustar la ruta correcta
import { generateWhatsAppMessage } from "@/utils/whatsapp";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const dispatch = useDispatch();

  const handleDeliveryMethodChange = (method: string) => {
    setDeliveryMethod(method);
  };

  const cartItems = useSelector((state: RootState) => state.cart);
  const totalAmount = cartItems.reduce(
    (total: number, item) => total + item.price * item.quantity,
    0
  );

  const handleAddContact = async () => {
    await dispatch(
      createOrderAction(
        cartItems,
        formData.name,
        formData.phone,
        formData.address,
        deliveryMethod
      ) as any
    );
    //generateWhatsAppMessage(cartItems, totalAmount);
    //dispatch(clearCart());
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-4">Confirmar Pedido</h1>
        <DeliveryForm
          onDeliveryMethodChange={handleDeliveryMethodChange}
          formData={formData}
          setFormData={setFormData}
        />
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Detalles del Pedido</h2>
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="py-2 text-left">Producto</th>
                <th className="py-2 text-center">Cantidad</th>
                <th className="py-2 text-center">Precio Unitario</th>
                <th className="py-2 text-center">Precio Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-3">{item.name}</td>
                  <td className="py-3 text-center">{item.quantity}</td>
                  <td className="py-3 text-center">${item.price.toFixed(2)}</td>
                  <td className="py-3 text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xl font-semibold mt-4">
            Total: ${totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-4 px-4">
        {deliveryMethod === "delivery" && (
          <p className="text-sm text-red-600 mt-2">
            * Por favor, ingrese su número de teléfono y dirección para el envío
            a domicilio.
          </p>
        )}
        {deliveryMethod === "pickup" && (
          <p className="text-sm text-red-600 mt-2">
            * Por favor, ingrese su nombre para el retiro en el local.
          </p>
        )}
        <button
          onClick={handleAddContact}
          className={`${
            (deliveryMethod === "delivery" &&
              (!formData.phone || !formData.address)) ||
            (deliveryMethod === "pickup" && !formData.name)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-2 rounded-md mt-4 w-full`}
          disabled={
            (deliveryMethod === "delivery" &&
              (!formData.phone || !formData.address)) ||
            (deliveryMethod === "pickup" && !formData.name)
          }
        >
          Realizar Pedido
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
