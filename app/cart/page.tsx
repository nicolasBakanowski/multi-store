"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { CartItem } from "@/interfaces/Cart";
import CartItemCard from "@/components/CartItemCard";

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
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
            <div className="space-y-3 mb-6">
              {cart.map((product: CartItem) => (
                <CartItemCard key={product.id} cartItem={product} />
              ))}
            </div>

            <div className="border-t border-crema-dark pt-4 flex justify-between items-center">
              <span className="text-carbon/50 text-sm">Total del carrito</span>
              <span className="font-display text-2xl text-carbon tabular-nums">
                ${total.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
