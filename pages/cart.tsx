import React from "react";
import { useSelector } from "react-redux";
import { Product } from "@/interfaces/Products";
import { RootState } from "../redux/routeReducer";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  console.log(cartItems, "esto es");
  return (
    <div>
      <h1>Tu Carrito de Compras</h1>
      <ul>
        {cartItems.map((item: Product) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
