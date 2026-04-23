"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";

import { RootState } from "@/redux/store";
import { CartItem } from "@/interfaces/Cart";
import CartItemCard from "@/components/CartItemCard";
import StepIndicator from "@/components/StepIndicator";

const CHECKOUT_STEPS = ["Carrito", "Entrega", "Confirmar"];

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-2xl mx-auto">
        <StepIndicator steps={CHECKOUT_STEPS} current={0} />

        <div className="flex items-center justify-between mb-5">
          <h1 className="font-display text-3xl text-verde">Carrito</h1>
          <Link
            href="/"
            className="text-sm text-ambar hover:text-ambar-dark transition-colors"
          >
            ← Seguir comprando
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-crema-dark flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag size={28} className="text-carbon/30" />
            </div>
            <p className="font-display text-xl text-carbon/40 mb-2">
              Tu carrito está vacío
            </p>
            <p className="text-sm text-carbon/30 mb-6">
              Explorá nuestras categorías y agregá productos
            </p>
            <Link
              href="/"
              className="inline-block bg-verde text-crema px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-verde-light transition-colors"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-5">
              {cart.map((product: CartItem) => (
                <CartItemCard key={product.id} cartItem={product} />
              ))}
            </div>

            <div className="bg-white border border-crema-dark rounded-2xl p-5 shadow-card">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-carbon/50 uppercase tracking-wide font-medium mb-0.5">
                    Total del carrito
                  </p>
                  <p className="text-carbon/40 text-sm tabular-nums">
                    {itemCount} {itemCount === 1 ? "unidad" : "unidades"}
                  </p>
                </div>
                <span className="font-display text-3xl text-carbon tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* F — CTA sticky y prominente */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-crema/96 backdrop-blur-sm border-t border-crema-dark px-4 py-4 z-40">
          <Link href="/checkout">
            <button className="w-full bg-verde hover:bg-verde-light text-crema py-3.5 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-between px-5 shadow-glow-verde cursor-pointer">
              <span>Ir al checkout</span>
              <div className="flex items-center gap-2">
                <span className="bg-crema/15 rounded-lg px-2.5 py-1 text-sm tabular-nums font-bold">
                  ${total.toFixed(2)}
                </span>
                <FiArrowRight size={18} />
              </div>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
