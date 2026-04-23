"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

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
    <div className="min-h-screen">
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
            <p className="text-carbon/40 mb-6 text-lg font-display">
              Tu carrito está vacío.
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

            <div className="bg-white border border-crema-dark rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-carbon/50 uppercase tracking-wide font-medium mb-0.5">
                    Total del carrito
                  </p>
                  <p className="text-carbon/40 text-sm">
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
    </div>
  );
}
