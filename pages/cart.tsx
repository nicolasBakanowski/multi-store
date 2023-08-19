// pages/cart.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Product } from "@/interfaces/Products";
import { generateWhatsAppMessage } from "@/utils/whatsapp";
const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const handleAddContact = () => {
    generateWhatsAppMessage(cart);
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-4">Carrito de Compras</h1>
      <button
        onClick={handleAddContact}
        className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
      >
        Agregar a WhatsApp
      </button>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cart.map((product: Product) => (
            <li key={product.id} className="border p-4 rounded-md shadow-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full object-cover mb-2"
              />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
