import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { removeItem, discountProduct } from "@/redux/slices/cartSlice";
import { CartItem } from "@/interfaces/Cart";

const CartItemCard: React.FC<{ cartItem: CartItem }> = ({ cartItem }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityToRemove, setQuantityToRemove] = useState(1);

  const handleRemoveFromCart = () => {
    if (cartItem.quantity > 1) {
      setIsModalOpen(true);
    } else {
      dispatch(removeItem(cartItem.id));
    }
  };

  const handleConfirmRemove = () => {
    if (quantityToRemove > 0) {
      if (quantityToRemove < cartItem.quantity) {
        dispatch(
          discountProduct({ id: cartItem.id, quantity: quantityToRemove })
        );
      } else {
        dispatch(removeItem(cartItem.id));
      }
      setIsModalOpen(false);
    }
  };

  const handleRemoveAll = () => {
    dispatch(removeItem(cartItem.id));
    setIsModalOpen(false);
  };

  return (
    <div className="flex bg-gray-100 border border-gray-300 p-2 rounded-lg mb-4">
      <div className="relative">
        <Image
          src={cartItem.imageUrl}
          alt={cartItem.name}
          width={150}
          height={150}
          className="rounded-l-lg"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between p-2">
        <div>
          <h3 className="text-gray-800 text-lg font-semibold">
            {cartItem.name}
          </h3>
          <div className="flex items-center mt-2">
            <p className="text-gray-600 text-sm mr-2">
              Cantidad en carrito: {cartItem.quantity}
            </p>
            <p className="text-gray-600 text-sm">
              Total: ${(cartItem.price * cartItem.quantity).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <button
            onClick={handleRemoveFromCart}
            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none"
          >
            Quitar del Carro
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Eliminar del Carro</h2>
            <p className="text-sm mb-2">
              Cantidad actual en el carro: {cartItem.quantity}
            </p>
            <input
              type="number"
              min={1}
              max={cartItem.quantity}
              value={quantityToRemove}
              onChange={(e) => setQuantityToRemove(Number(e.target.value))}
              className="w-full border rounded-md p-2 mb-2"
            />
            <button
              onClick={handleConfirmRemove}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 mr-2"
            >
              Eliminar
            </button>
            <button
              onClick={handleRemoveAll}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
            >
              Eliminar Todos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemCard;
