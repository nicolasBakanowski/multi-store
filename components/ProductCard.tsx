"use client";

import React, { useState } from "react";
import { ProductCardProps, Product } from "../interfaces/Products";
import { setCurrentProduct } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { addItem } from "@/redux/slices/cartSlice";
import { CartItem } from "@/interfaces/Cart";
import { MdEdit, MdAddShoppingCart, MdCheckCircle } from "react-icons/md";
import { RootState } from "@/redux/store";

const ProductCard: React.FC<ProductCardProps> = ({ product, onEditClick, brandName }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState(product.imageUrl);
  const [added, setAdded] = useState(false);

  const userRole = useSelector((state: RootState) => state.user.user?.roleId);
  const cartQuantity = useSelector((state: RootState) =>
    state.cart.find((i) => i.id === product.id)?.quantity ?? 0
  );

  const isUnavailable = !product.available || product.stock === 0;
  const isLowStock = !isUnavailable && product.stock > 0 && product.stock <= 5;

  const handleProductClick = (p: Product) => dispatch(setCurrentProduct(p));

  const handleAddToCart = () => {
    if (isUnavailable) return;
    const cartItem: CartItem = { ...product, quantity };
    dispatch(addItem(cartItem));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 flex group ${
      isUnavailable
        ? "border-crema-dark opacity-70"
        : "border-crema-dark shadow-card hover:shadow-card-hover"
    }`}>
      <Link
        href={`/product/${product.id}`}
        onClick={() => handleProductClick(product)}
        className="shrink-0 relative overflow-hidden"
      >
        <div className="relative w-[110px] sm:w-[130px] md:w-[140px] h-[160px] sm:h-[185px] md:h-[200px]">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${!isUnavailable ? "group-hover:scale-105" : "grayscale-[30%]"}`}
            onError={() => setImgSrc("/pinta-bien.png")}
            sizes="140px"
          />
          {/* Stock badge */}
          {isUnavailable && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-carbon/80 text-crema text-xs font-semibold px-2.5 py-1 rounded-full">
                Sin stock
              </span>
            </div>
          )}
          {isLowStock && (
            <div className="absolute top-2 left-2">
              <span className="bg-ambar text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
                Últimas {product.stock}
              </span>
            </div>
          )}
          {/* En carrito badge */}
          {cartQuantity > 0 && (
            <div className="absolute top-2 right-2">
              <span className="bg-verde text-crema text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartQuantity}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col justify-between p-2.5 sm:p-3.5 flex-1 min-w-0">
        <div>
          {brandName && (
            <p className="text-xs font-semibold text-ambar uppercase tracking-wide mb-0.5">
              {brandName}
            </p>
          )}
          <Link
            href={`/product/${product.id}`}
            onClick={() => handleProductClick(product)}
          >
            <h3 className="font-display text-carbon text-sm sm:text-base leading-snug mb-1.5 hover:text-verde transition-colors duration-200 line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-baseline gap-0.5">
            <span className="text-xs text-carbon/40 font-medium mb-0.5">$</span>
            <span className="text-ambar font-bold text-xl tabular-nums leading-none">
              {product.price.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-1.5 bg-crema-50 rounded-lg p-1 w-fit border border-crema-dark/50">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={isUnavailable}
              className="w-7 h-7 bg-white hover:bg-crema-dark border border-crema-dark text-carbon rounded-md text-sm font-bold transition-colors duration-150 cursor-pointer flex items-center justify-center shadow-sm leading-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold tabular-nums text-carbon select-none">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              disabled={isUnavailable}
              className="w-7 h-7 bg-white hover:bg-crema-dark border border-crema-dark text-carbon rounded-md text-sm font-bold transition-colors duration-150 cursor-pointer flex items-center justify-center shadow-sm leading-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAddToCart}
              disabled={isUnavailable}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                isUnavailable
                  ? "bg-crema-dark text-carbon/30 cursor-not-allowed"
                  : added
                  ? "bg-verde text-crema shadow-glow-verde"
                  : "bg-ambar hover:bg-ambar-dark text-white shadow-sm hover:shadow-glow-ambar"
              }`}
            >
              {added ? (
                <>
                  <MdCheckCircle size={14} />
                  ¡Agregado!
                </>
              ) : isUnavailable ? (
                "Sin stock"
              ) : (
                <>
                  <MdAddShoppingCart size={14} />
                  Agregar
                </>
              )}
            </button>

            {(userRole === 1 || userRole === 4) && (
              <button
                onClick={() => onEditClick()}
                className="p-2 border border-crema-dark rounded-xl text-carbon/40 hover:text-verde hover:border-verde hover:bg-verde-50 transition-all duration-200 cursor-pointer"
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
