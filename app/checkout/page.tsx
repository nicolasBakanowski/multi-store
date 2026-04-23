"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowRight, FiArrowLeft, FiMapPin, FiShoppingBag } from "react-icons/fi";

import { RootState } from "@/redux/store";
import DeliveryForm from "@/components/DeliveryForm";
import StepIndicator from "@/components/StepIndicator";
import { clearCart } from "@/redux/slices/cartSlice";
import { generateWhatsAppMessage } from "@/utils/whatsapp";
import Spinner from "@/components/Spinner";
import { createOrder } from "@/app/actions/order";

const CHECKOUT_STEPS = ["Carrito", "Entrega", "Confirmar"];

type CheckoutStep = "delivery" | "confirm";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [processing, setProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("delivery");
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const isFormComplete =
    (deliveryMethod === "delivery" && !!formData.phone && !!formData.address) ||
    (deliveryMethod === "pickup" && !!formData.name);

  const handleConfirmOrder = async () => {
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
        <StepIndicator
          steps={CHECKOUT_STEPS}
          current={checkoutStep === "delivery" ? 1 : 2}
        />

        {checkoutStep === "delivery" ? (
          <>
            <h1 className="font-display text-3xl text-verde mb-6">
              Datos de Entrega
            </h1>
            <DeliveryForm
              onDeliveryMethodChange={(method) => {
                setDeliveryMethod(method);
              }}
              formData={formData}
              setFormData={setFormData}
            />
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl text-verde mb-6">
              Confirmar Pedido
            </h1>

            {/* Delivery method summary */}
            <div className="bg-white border border-crema-dark rounded-xl p-5 shadow-sm mb-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-verde/10 flex items-center justify-center shrink-0 mt-0.5">
                  {deliveryMethod === "pickup" ? (
                    <FiShoppingBag size={16} className="text-verde" />
                  ) : (
                    <FiMapPin size={16} className="text-verde" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-carbon/40 uppercase tracking-wide mb-1">
                    {deliveryMethod === "pickup"
                      ? "Retiro en el local"
                      : "Envío a domicilio"}
                  </p>
                  {deliveryMethod === "pickup" ? (
                    <p className="text-carbon font-medium text-sm">{formData.name}</p>
                  ) : (
                    <div>
                      <p className="text-carbon font-medium text-sm">{formData.phone}</p>
                      <p className="text-carbon/60 text-sm mt-0.5">{formData.address}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setCheckoutStep("delivery")}
                  className="text-xs text-ambar hover:text-ambar-dark transition-colors font-medium shrink-0 mt-0.5"
                >
                  Editar
                </button>
              </div>
            </div>

            {/* Products summary */}
            <div className="bg-white border border-crema-dark rounded-xl p-5 shadow-sm">
              <h2 className="font-medium text-carbon text-base mb-4">
                Resumen del pedido
              </h2>
              <div className="divide-y divide-crema-dark/50">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-3 flex justify-between items-center gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-carbon text-sm font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-carbon/40 text-xs mt-0.5">
                        {item.quantity} {item.quantity === 1 ? "unidad" : "unidades"} · ${item.price.toFixed(2)} c/u
                      </p>
                    </div>
                    <span className="text-carbon font-semibold tabular-nums text-sm shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-crema-dark">
                <span className="text-carbon/50 text-sm">Total</span>
                <span className="font-display text-2xl text-carbon tabular-nums">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-crema/95 backdrop-blur-sm border-t border-crema-dark px-4 py-4">
        {checkoutStep === "delivery" ? (
          <button
            onClick={() => setCheckoutStep("confirm")}
            disabled={!isFormComplete}
            className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
              !isFormComplete
                ? "bg-crema-dark text-carbon/30 cursor-not-allowed"
                : "bg-ambar text-white hover:bg-ambar-dark"
            }`}
          >
            Continuar
            <FiArrowRight size={18} />
          </button>
        ) : (
          <div className="space-y-2">
            <button
              onClick={handleConfirmOrder}
              disabled={processing}
              className="w-full py-3.5 rounded-xl font-semibold text-base bg-ambar text-white hover:bg-ambar-dark transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {processing ? <Spinner /> : "Realizar Pedido"}
            </button>
            <button
              onClick={() => setCheckoutStep("delivery")}
              className="w-full py-2.5 text-sm text-carbon/50 hover:text-carbon transition-colors flex items-center justify-center gap-1.5"
            >
              <FiArrowLeft size={14} />
              Volver a editar datos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
