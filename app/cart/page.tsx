"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { CartItem } from "@/interfaces/Cart";
import CartItemCard from "@/components/CartItemCard";

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="min-h-screen text-center">
      <Link href="/" className="mb-4 inline-block">
        continuar comprando
      </Link>
      <div className="container">
        <h1 className="text-2xl font-semibold mb-4">Carrito de Compras</h1>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cart.map((product: CartItem) => (
              <CartItemCard key={product.id} cartItem={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

