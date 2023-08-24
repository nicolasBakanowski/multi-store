import React, { useState } from "react";
import Image from "next/image";
import addToCartIcon from "../public/addcart.svg";
import details from "../public/details.svg";

interface ProductActionsProps {
  onAddToCart: () => void;
  onDetails: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  onAddToCart,
  onDetails,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={onAddToCart}
        className="bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600 focus:outline-none"
      >
        <Image src={addToCartIcon} alt="Add to Cart" className="h-5 w-5" />
      </button>
      <div className="text-blue-500 cursor-pointer">
        <span onClick={onDetails}>Ver detalles</span>
        <Image
          src={details}
          alt="Details"
          className="h-4 w-4 ml-1 inline-block"
        />
      </div>
    </div>
  );
};

export default ProductActions;
