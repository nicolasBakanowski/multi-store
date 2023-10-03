import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { removeItem, discountProduct } from "@/redux/slices/cartSlice";
import { CartItem } from "@/interfaces/Cart";
import { FiX, FiMinus, FiPlus } from "react-icons/fi";

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
    <div className="relative">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Fondo semi-transparente */}
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-lg shadow-md relative text-center">
            <h2 className="text-lg font-semibold mb-2">Eliminar del Carro</h2>
            <p className="text-sm mb-4">¿Cuántos productos deseas eliminar?</p>
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={() => {
                  if (quantityToRemove > 1) {
                    setQuantityToRemove(quantityToRemove - 1);
                  }
                }}
                className="text-gray-600 hover:text-gray-800 focus:outline-none text-2xl"
              >
                <FiMinus />
              </button>
              <span className="text-2xl mx-4">{quantityToRemove}</span>
              <button
                onClick={() => {
                  if (quantityToRemove < cartItem.quantity) {
                    setQuantityToRemove(quantityToRemove + 1);
                  }
                }}
                className="text-gray-600 hover:text-gray-800 focus:outline-none text-2xl"
              >
                <FiPlus />
              </button>
            </div>
            <button
              onClick={handleConfirmRemove}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 mr-2"
            >
              Eliminar {quantityToRemove}
            </button>
            <button
              onClick={handleRemoveAll}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
            >
              Eliminar Todos
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
      <div className="w-full bg-gray-900 flex-grow shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl flex">
        <div onClick={handleRemoveFromCart} className="flex">
          <Image
            src={cartItem.imageUrl}
            alt={cartItem.name}
            width={190}
            height={140}
            className="h-45 w-45 object-cover rounded-l-xl"
          />
        </div>
        <div className="px-4 py-3 w-2/3">
          <h3 className="text-white text-lg font-semibold mb-1">
            {cartItem.name}
          </h3>
          <p className="text-gray-300 text-sm mb-2">
            Cantidad en carrito: {cartItem.quantity}
          </p>
          <p className="text-gray-300 text-sm mb-2">
            Total: ${(cartItem.price * cartItem.quantity).toFixed(2)}
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleRemoveFromCart}
              className="bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 focus:outline-none"
            >
              Quitar del Carro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
