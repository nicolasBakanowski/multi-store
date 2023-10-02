import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";

import { CartItem } from "../interfaces/Cart";
import CartItemCard from "../components/CartItemCard";

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="bg-gray-100 min-h-screen text-center">
      <div className="container p-3">
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
};

export default CartPage;
