import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { Product } from "@/interfaces/Products";
import { RootState } from "@/redux/store";
import Link from "next/link";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    //dispatch(addItem(product));
  };
  const product = useSelector(
    (state: RootState) => state.product.currentProduct
  );
  if (!product) {
    return <div>no hay producto...</div>;
  }

  return (
    <div>
      <main className="container mx-auto mt-10 p-4">
        <div className="flex flex-col items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-1/2 md:w-1/3 lg:w-1/4 object-cover mb-4"
          />
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
            <button
              onClick={() => {
                handleAddToCart(product);
              }}
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailsPage;
