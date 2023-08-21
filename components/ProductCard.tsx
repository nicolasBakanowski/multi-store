import React from "react";
import { ProductCardProps, Product } from "../interfaces/Products";
import { setCurrentProduct } from "@/redux/slices/productSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import addToCartIcon from "../public/addcart.svg";
import details from "../public/details.svg";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const handleProductClick = (product: Product) => {
    dispatch(setCurrentProduct(product));
  };

  return (
    <div className="w-72 bg-black shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <Link href={`/product/${product.id}`}>
        <div onClick={() => handleProductClick(product)}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={144}
            height={160}
            className="h-80 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-white mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-white truncate block capitalize">
              {product.name}
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-white cursor-auto my-3">
                ${product.price.toFixed(2)}
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
              </del>
              <div className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  {/* ...Icon path data... */}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
