"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowRight, FiArrowLeft, FiMapPin, FiShoppingBag, FiCheck, FiMessageCircle } from "react-icons/fi";
import Link from "next/link";

import { RootState } from "@/redux/store";
import DeliveryForm from "@/components/DeliveryForm";
import StepIndicator from "@/components/StepIndicator";
import { clearCart } from "@/redux/slices/cartSlice";
import { generateWhatsAppMessage } from "@/utils/whatsapp";
import Spinner from "@/components/Spinner";
import { createOrder } from "@/app/actions/order";
import { trackEvent } from "@/utils/analytics";
import { CartItem } from "@/interfaces/Cart";

const CHECKOUT_STEPS = ["Carrito", "Entrega", "Confirmar"];

type CheckoutStep = "delivery" | "confirm" | "success";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [processing, setProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("delivery");
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [orderId, setOrderId] = useState<number | null>(null);
  const completedCart = useRef<CartItem[]>([]);
  const completedTotal = useRef<number>(0);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalCostPrice = cartItems.reduce(
    (total, item) => total + (item.costPrice ?? 0) * item.quantity,
    0
  );

  // G — delivery también requiere nombre
  const isFormComplete =
    (deliveryMethod === "delivery" && !!formData.name && !!formData.phone && !!formData.address) ||
    (deliveryMethod === "pickup" && !!formData.name);

  useEffect(() => {
    trackEvent({
      name: "CheckoutStarted",
      properties: {
        cart_id: "redux_cart",
        items_count: cartItems.length,
        subtotal: totalAmount,
        currency: "ARS",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirmOrder = async () => {
    setProcessing(true);
    try {
      const simplifiedCartItems = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      const result = await createOrder({
        simplifiedCartItems,
        userInfo: { ...formData },
        deliveryMethod,
        totalAmount,
        totalCostPrice,
      });
      trackEvent({
        name: "OrderCompleted",
        properties: {
          order_id: result?.orderId ?? null,
          cart_id: "redux_cart",
          revenue_gross: totalAmount,
          currency: "ARS",
          items_count: cartItems.length,
          delivery_method: deliveryMethod,
        },
      });

      // E — guardar snapshot antes de limpiar carrito
      completedCart.current = [...cartItems];
      completedTotal.current = totalAmount;
      setOrderId(result?.orderId ?? null);

      generateWhatsAppMessage(cartItems, totalAmount);
      dispatch(clearCart());
      setCheckoutStep("success");
    } finally {
      setProcessing(false);
    }
  };

  const stepIndex =
    checkoutStep === "delivery" ? 1 : checkoutStep === "confirm" ? 2 : 3;

  return (
    <div className="min-h-screen pb-36">
      <div className="max-w-2xl mx-auto py-2 px-2">

        {/* E — pantalla éxito */}
        {checkoutStep === "success" ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 rounded-full bg-vb-ambar/10 border-2 border-vb-ambar/20 flex items-center justify-center mx-auto mb-5">
              <FiCheck size={36} className="text-vb-ambar" strokeWidth={2.5} />
            </div>
            <h1 className="font-display text-3xl text-vb-negro mb-2">
              ¡Pedido registrado!
            </h1>
            {orderId && (
              <p className="text-xs text-vb-negro/45 font-medium uppercase tracking-widest mb-2">
                Pedido #{orderId}
              </p>
            )}
            <p className="text-vb-negro/60 text-sm mb-1">
              {deliveryMethod === "pickup"
                ? `Retiro en el local — ${formData.name}`
                : `Envío a ${formData.address}`}
            </p>
            <p className="text-vb-negro/55 text-sm mb-8">
              Te contactamos a la brevedad para coordinar.
            </p>

            <div className="bg-vb-crema border border-black/10 rounded-2xl p-5 shadow-card text-left mb-6">
              <p className="text-xs text-vb-negro/45 uppercase tracking-wide font-medium mb-3">
                Resumen
              </p>
              <div className="divide-y divide-black/10">
                {completedCart.current.map((item) => (
                  <div key={item.id} className="py-2.5 flex justify-between items-center gap-3">
                    <div className="min-w-0">
                      <p className="text-vb-negro text-sm font-medium truncate">{item.name}</p>
                      <p className="text-vb-negro/55 text-xs">{item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <span className="text-vb-negro font-semibold tabular-nums text-sm shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-black/10">
                <span className="text-vb-negro/60 text-sm">Total</span>
                <span className="font-display text-2xl text-vb-negro tabular-nums">
                  ${completedTotal.current.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => generateWhatsAppMessage(completedCart.current, completedTotal.current)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] transition-colors cursor-pointer"
              >
                <FiMessageCircle size={18} />
                Reenviar pedido por WhatsApp
              </button>
              <Link href="/">
                <button className="w-full py-3 rounded-xl border border-black/10 text-vb-negro/70 hover:text-vb-negro hover:border-vb-ambar/40 text-sm font-medium transition-all cursor-pointer">
                  Volver al inicio
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <StepIndicator steps={CHECKOUT_STEPS} current={stepIndex - 1} />

            {checkoutStep === "delivery" ? (
              <>
                <h1 className="font-display text-3xl text-vb-negro mb-6">
                  Datos de entrega
                </h1>
                <DeliveryForm
                  onDeliveryMethodChange={(method) => setDeliveryMethod(method)}
                  formData={formData}
                  setFormData={setFormData}
                />
              </>
            ) : (
              <>
                <h1 className="font-display text-3xl text-vb-negro mb-6">
                  Confirmar pedido
                </h1>

                <div className="bg-vb-crema border border-black/10 rounded-2xl p-5 shadow-card mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-vb-ambar/10 flex items-center justify-center shrink-0 mt-0.5">
                      {deliveryMethod === "pickup" ? (
                        <FiShoppingBag size={16} className="text-vb-ambar" />
                      ) : (
                        <FiMapPin size={16} className="text-vb-ambar" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-vb-negro/45 uppercase tracking-wide mb-1">
                        {deliveryMethod === "pickup" ? "Retiro en el local" : "Envío a domicilio"}
                      </p>
                      <p className="text-vb-negro font-medium text-sm">{formData.name}</p>
                      {deliveryMethod === "delivery" && (
                        <>
                          <p className="text-vb-negro/70 text-sm mt-0.5">{formData.phone}</p>
                          <p className="text-vb-negro/70 text-sm">{formData.address}</p>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => setCheckoutStep("delivery")}
                      className="text-xs text-vb-ambar hover:text-vb-dorado transition-colors font-medium shrink-0 mt-0.5 cursor-pointer"
                    >
                      Editar
                    </button>
                  </div>
                </div>

                <div className="bg-vb-crema border border-black/10 rounded-2xl p-5 shadow-card">
                  <h2 className="font-medium text-vb-negro text-base mb-4">
                    Resumen del pedido
                  </h2>
                  <div className="divide-y divide-black/10">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-3 flex justify-between items-center gap-3">
                        <div className="min-w-0">
                          <p className="text-vb-negro text-sm font-medium truncate">{item.name}</p>
                          <p className="text-vb-negro/55 text-xs mt-0.5">
                            {item.quantity} {item.quantity === 1 ? "unidad" : "unidades"} · ${item.price.toFixed(2)} c/u
                          </p>
                        </div>
                        <span className="text-vb-negro font-semibold tabular-nums text-sm shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-black/10">
                    <span className="text-vb-negro/60 text-sm">Total</span>
                    <span className="font-display text-2xl text-vb-negro tabular-nums">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* CTA fijo — solo en delivery y confirm */}
      {checkoutStep !== "success" && (
        <div className="fixed bottom-0 left-0 right-0 bg-vb-crema/96 backdrop-blur-sm border-t border-black/10 px-4 py-4">
          {checkoutStep === "delivery" ? (
            <button
              onClick={() => setCheckoutStep("confirm")}
              disabled={!isFormComplete}
              className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                !isFormComplete
                  ? "bg-black/10 text-vb-negro/35 cursor-not-allowed"
                  : "bg-vb-ambar text-vb-negro hover:bg-vb-dorado"
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
                className="w-full py-3.5 rounded-xl font-semibold text-base bg-vb-ambar text-vb-negro hover:bg-vb-dorado transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {processing ? <Spinner /> : "Confirmar pedido"}
              </button>
              <button
                onClick={() => setCheckoutStep("delivery")}
                className="w-full py-2.5 text-sm text-vb-negro/60 hover:text-vb-negro transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FiArrowLeft size={14} />
                Volver a datos de entrega
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
