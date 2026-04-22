"use client";

import React, { useState } from "react";
import { ProductCardProps, Product } from "../interfaces/Products";
import { setCurrentProduct } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { addItem } from "@/redux/slices/cartSlice";
import { CartItem } from "@/interfaces/Cart";
import { MdEdit, MdAddShoppingCart } from "react-icons/md";
import { RootState } from "@/redux/store";

const ProductCard: React.FC<ProductCardProps> = ({ product, onEditClick }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState(product.imageUrl);
  const [added, setAdded] = useState(false);

  const userRole = useSelector((state: RootState) => state.user.user?.roleId);

  const handleProductClick = (p: Product) => {
    dispatch(setCurrentProduct(p));
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = { ...product, quantity };
    dispatch(addItem(cartItem));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white border border-crema-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex">
      <Link
        href={`/product/${product.id}`}
        onClick={() => handleProductClick(product)}
        className="shrink-0"
      >
        <Image
          src={imgSrc}
          alt={product.name}
          width={140}
          height={195}
          className="h-[195px] w-[140px] object-cover"
          onError={() => setImgSrc("/pinta-bien.png")}
        />
      </Link>

      <div className="flex flex-col justify-between p-3 flex-1 min-w-0">
        <div>
          <Link
            href={`/product/${product.id}`}
            onClick={() => handleProductClick(product)}
          >
            <h3 className="font-display text-carbon text-base leading-snug mb-1 hover:text-verde transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-ambar font-bold text-lg tabular-nums">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 bg-crema hover:bg-crema-dark border border-crema-dark text-carbon rounded text-sm font-bold transition-colors"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold tabular-nums text-carbon">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 bg-crema hover:bg-crema-dark border border-crema-dark text-carbon rounded text-sm font-bold transition-colors"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                added
                  ? "bg-verde text-crema"
                  : "bg-ambar text-white hover:bg-ambar-dark"
              }`}
            >
              <MdAddShoppingCart size={14} />
              {added ? "¡Agregado!" : "Agregar"}
            </button>

            {(userRole === 1 || userRole === 4) && (
              <button
                onClick={() => onEditClick()}
                className="p-1.5 border border-crema-dark rounded-lg text-carbon/50 hover:text-verde hover:border-verde transition-colors"
              >
                <MdEdit size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
