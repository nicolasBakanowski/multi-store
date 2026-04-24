"use client";

import React from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { removeItem, discountProduct, addItem } from "@/redux/slices/cartSlice";
import { CartItem } from "@/interfaces/Cart";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItemCard: React.FC<{ cartItem: CartItem }> = ({ cartItem }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(addItem({ ...cartItem, quantity: 1 }));
  };

  const handleDecrease = () => {
    if (cartItem.quantity <= 1) {
      dispatch(removeItem(cartItem.id));
    } else {
      dispatch(discountProduct({ id: cartItem.id, quantity: 1 }));
    }
  };

  const handleRemoveAll = () => {
    dispatch(removeItem(cartItem.id));
  };

  return (
    <div className="bg-vb-crema border border-black/10 rounded-2xl overflow-hidden flex shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="shrink-0 relative">
        <Image
          src={cartItem.imageUrl}
          alt={cartItem.name}
          width={96}
          height={104}
          className="w-24 h-[104px] object-cover"
        />
      </div>

      <div className="flex-1 px-4 py-3 flex flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-vb-negro text-base leading-snug line-clamp-2 flex-1">
            {cartItem.name}
          </h3>
          <button
            onClick={handleRemoveAll}
            className="text-vb-negro/20 hover:text-vb-rojo transition-colors cursor-pointer shrink-0 mt-0.5 p-1"
            aria-label="Quitar del carrito"
          >
            <FiTrash2 size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2 gap-3">
          {/* C — qty inline */}
          <div className="flex items-center gap-0.5 bg-white/60 rounded-lg p-1 border border-black/10">
            <button
              onClick={handleDecrease}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-black/5 transition-colors cursor-pointer text-vb-negro"
              aria-label="Reducir cantidad"
            >
              <FiMinus size={11} />
            </button>
            <span className="w-8 text-center text-sm font-semibold tabular-nums text-vb-negro select-none">
              {cartItem.quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-black/5 transition-colors cursor-pointer text-vb-negro"
              aria-label="Aumentar cantidad"
            >
              <FiPlus size={11} />
            </button>
          </div>

          {/* D — desglose precio */}
          <div className="text-right">
            <p className="text-xs text-vb-negro/45 tabular-nums">
              {cartItem.quantity} × ${cartItem.price.toFixed(2)}
            </p>
            <p className="text-vb-ambar font-bold tabular-nums text-base leading-tight">
              ${(cartItem.price * cartItem.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
