"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import DeliveryForm from "@/components/DeliveryForm";
import { clearCart } from "@/redux/slices/cartSlice";
import { generateWhatsAppMessage } from "@/utils/whatsapp";
import Spinner from "@/components/Spinner";
import { createOrder } from "@/app/actions/order";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const isDisabled =
    (deliveryMethod === "delivery" &&
      (!formData.phone || !formData.address)) ||
    (deliveryMethod === "pickup" && !formData.name);

  const handleAddContact = async () => {
    setProcessing(true);
    try {
      const simplifiedCartItems = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      await createOrder({
        simplifiedCartItems,
        userInfo: { ...formData },
        deliveryMethod,
      });
      generateWhatsAppMessage(cartItems, totalAmount);
      dispatch(clearCart());
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pb-36">
      <div className="max-w-2xl mx-auto py-2 px-2">
        <h1 className="font-display text-3xl text-verde mb-6">
          Confirmar Pedido
        </h1>

        <DeliveryForm
          onDeliveryMethodChange={(method) => setDeliveryMethod(method)}
          formData={formData}
          setFormData={setFormData}
        />

        <div className="bg-white border border-crema-dark rounded-xl p-5 mt-4 shadow-sm">
          <h2 className="font-display text-xl text-carbon mb-4">Resumen</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-crema-dark">
                <th className="py-2 text-left font-medium text-carbon/40">
                  Producto
                </th>
                <th className="py-2 text-center font-medium text-carbon/40">
                  Cant.
                </th>
                <th className="py-2 text-right font-medium text-carbon/40">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b border-crema-dark/50">
                  <td className="py-3 text-carbon">{item.name}</td>
                  <td className="py-3 text-center text-carbon/50 tabular-nums">
                    {item.quantity}
                  </td>
                  <td className="py-3 text-right text-carbon tabular-nums font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-crema-dark">
            <span className="text-carbon/50 text-sm">Total</span>
            <span className="font-display text-2xl text-carbon tabular-nums">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-crema/95 backdrop-blur-sm border-t border-crema-dark px-4 py-4">
        {deliveryMethod === "delivery" && (
          <p className="text-xs text-carbon/40 mb-2">
            * Ingresá tu teléfono y dirección para el envío a domicilio.
          </p>
        )}
        {deliveryMethod === "pickup" && (
          <p className="text-xs text-carbon/40 mb-2">
            * Ingresá tu nombre para el retiro en el local.
          </p>
        )}
        <button
          onClick={handleAddContact}
          disabled={isDisabled || processing}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            isDisabled
              ? "bg-crema-dark text-carbon/30 cursor-not-allowed"
              : "bg-ambar text-white hover:bg-ambar-dark"
          }`}
        >
          {processing ? <Spinner /> : "Realizar Pedido"}
        </button>
      </div>
    </div>
  );
}
