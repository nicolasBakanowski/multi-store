"use client";

import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import type { Product } from "@/interfaces/Products";
import { addItem } from "@/redux/slices/cartSlice";
import { MdAddShoppingCart } from "react-icons/md";

export default function ProductDetail({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }) as any);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen py-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-crema-dark overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 shrink-0">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={500}
              className="w-full h-64 md:h-full object-cover"
              priority
            />
          </div>

          <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-carbon leading-tight mb-3">
                {product.name}
              </h1>
              {product.description && (
                <p className="text-carbon/50 text-sm leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            <div>
              <p className="font-display text-4xl text-ambar tabular-nums mb-6">
                ${product.price.toFixed(2)}
              </p>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-carbon/40 uppercase tracking-wide">
                  Cantidad
                </span>
                <div className="flex items-center border border-crema-dark rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 bg-crema hover:bg-crema-dark text-carbon font-bold flex items-center justify-center transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold tabular-nums text-carbon">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 bg-crema hover:bg-crema-dark text-carbon font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  added
                    ? "bg-verde text-crema"
                    : "bg-ambar text-white hover:bg-ambar-dark"
                }`}
              >
                <MdAddShoppingCart size={18} />
                {added ? "¡Agregado al carrito!" : "Agregar al Carrito"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
