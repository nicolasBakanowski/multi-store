import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { removeItem, discountProduct } from "@/redux/slices/cartSlice";
import { CartItem } from "@/interfaces/Cart";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

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
    if (quantityToRemove >= cartItem.quantity) {
      dispatch(removeItem(cartItem.id));
    } else {
      dispatch(discountProduct({ id: cartItem.id, quantity: quantityToRemove }));
    }
    setIsModalOpen(false);
  };

  const handleRemoveAll = () => {
    dispatch(removeItem(cartItem.id));
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-carbon/60"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="bg-white rounded-2xl shadow-xl p-6 relative text-center max-w-xs w-full mx-4 z-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-carbon/30 hover:text-carbon transition-colors"
            >
              <FiX size={18} />
            </button>
            <h2 className="font-display text-xl text-carbon mb-1">
              Quitar del carrito
            </h2>
            <p className="text-carbon/40 text-sm mb-5">
              ¿Cuántos {cartItem.name} querés quitar?
            </p>
            <div className="flex items-center justify-center gap-4 mb-5">
              <button
                onClick={() =>
                  setQuantityToRemove(Math.max(1, quantityToRemove - 1))
                }
                className="w-9 h-9 rounded-full border border-crema-dark hover:border-verde text-carbon flex items-center justify-center transition-colors"
              >
                <FiMinus size={14} />
              </button>
              <span className="text-2xl font-semibold tabular-nums text-carbon w-8 text-center">
                {quantityToRemove}
              </span>
              <button
                onClick={() =>
                  setQuantityToRemove(
                    Math.min(cartItem.quantity, quantityToRemove + 1)
                  )
                }
                className="w-9 h-9 rounded-full border border-crema-dark hover:border-verde text-carbon flex items-center justify-center transition-colors"
              >
                <FiPlus size={14} />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleConfirmRemove}
                className="flex-1 bg-ambar text-white py-2 rounded-xl text-sm font-semibold hover:bg-ambar-dark transition-colors"
              >
                Quitar {quantityToRemove}
              </button>
              <button
                onClick={handleRemoveAll}
                className="flex-1 bg-carbon text-crema py-2 rounded-xl text-sm font-semibold hover:bg-carbon-light transition-colors"
              >
                Quitar todos
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-crema-dark rounded-xl overflow-hidden flex shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="shrink-0">
          <Image
            src={cartItem.imageUrl}
            alt={cartItem.name}
            width={100}
            height={100}
            className="w-24 h-24 object-cover"
          />
        </div>
        <div className="flex-1 px-4 py-3 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-display text-carbon text-base leading-snug mb-0.5 truncate">
              {cartItem.name}
            </h3>
            <p className="text-carbon/40 text-xs">
              Cantidad: {cartItem.quantity}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-ambar font-bold tabular-nums">
              ${(cartItem.price * cartItem.quantity).toFixed(2)}
            </p>
            <button
              onClick={handleRemoveFromCart}
              className="flex items-center gap-1.5 text-carbon/30 hover:text-red-500 transition-colors text-xs"
            >
              <FiTrash2 size={13} />
              <span>Quitar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
