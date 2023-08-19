import React from "react";
import { ProductCardProps, Product } from "../interfaces/Products";
import { setCurrentProduct } from "@/redux/slices/productSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const handleProductClick = (product: Product) => {
    dispatch(setCurrentProduct(product));
  };

  return (
    <div className="border p-2 rounded-md flex flex-col md:flex-row">
      <div className="md:w-1/4 mb-2 md:mb-0">
        <div className="w-20 h-20 md:w-24 md:h-24">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="md:w-1/2 md:flex md:flex-col justify-center">
        <h2 className="text-md font-semibold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-md font-semibold mt-2">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="w-full md:w-1/4 flex items-center justify-end">
        <Link
          onClick={() => handleProductClick(product)}
          href={`/product/${product.id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          Ver Detalles
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4 ml-1 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
