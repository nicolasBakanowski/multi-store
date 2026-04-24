"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import type { Product } from "@/interfaces/Products";
import { addItem } from "@/redux/slices/cartSlice";
import { MdAddShoppingCart } from "react-icons/md";
import { trackEvent } from "@/utils/analytics";

export default function ProductDetail({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    trackEvent({
      name: "ProductViewed",
      properties: {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        currency: "ARS",
        in_stock: typeof (product as any).stock === "number" ? (product as any).stock > 0 : null,
      },
    });
  }, [product]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }) as any);
    trackEvent({
      name: "AddToCart",
      properties: {
        cart_id: "redux_cart",
        product_id: product.id,
        product_name: product.name,
        quantity,
        unit_price: product.price,
        currency: "ARS",
        in_stock: typeof (product as any).stock === "number" ? (product as any).stock > 0 : null,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen py-4">
      <div className="max-w-4xl mx-auto bg-vb-crema rounded-2xl shadow-card border border-black/10 overflow-hidden">
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
              <h1 className="font-display text-3xl md:text-4xl text-vb-negro leading-tight mb-3">
                {product.name}
              </h1>
              {product.description && (
                <p className="text-vb-negro/70 text-sm leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            <div>
              <p className="font-display text-4xl text-vb-ambar tabular-nums mb-6">
                ${product.price.toFixed(2)}
              </p>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-vb-negro/55 uppercase tracking-wide">
                  Cantidad
                </span>
                <div className="flex items-center border border-black/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 bg-white/70 hover:bg-white text-vb-negro font-bold flex items-center justify-center transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold tabular-nums text-vb-negro">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 bg-white/70 hover:bg-white text-vb-negro font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  added
                    ? "bg-vb-dorado text-vb-negro"
                    : "bg-vb-ambar text-vb-negro hover:bg-vb-dorado"
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
