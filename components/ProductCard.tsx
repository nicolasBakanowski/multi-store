import React, { useState } from "react";
import { ProductCardProps, Product } from "../interfaces/Products";
import { setCurrentProduct } from "@/redux/slices/productSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import addToCartIcon from "../public/addcart.svg";
import details from "../public/details.svg";
import { addItem } from "@/redux/slices/cartSlice";
import { CartItem } from "@/interfaces/Cart";
import { MdEdit } from "react-icons/md"; // Importa el ícono de edición

const ProductCard: React.FC<ProductCardProps> = ({ product, onEditClick }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleProductClick = (product: Product) => {
    dispatch(setCurrentProduct(product));
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = { ...product, quantity };
    dispatch(addItem(cartItem));
    setTotalQuantity(totalQuantity + quantity);
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 1500);
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-full bg-gray-900 flex-grow shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl flex">
      <Link href={`/product/${product.id}`}>
        <button onClick={() => handleProductClick(product)} className="flex">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={190}
            height={140}
            className="h-45 w-45 object-cover rounded-l-xl"
          />
        </button>
      </Link>
      <div className="px-4 py-3 w-2/3">
        <h3 className="text-white text-lg font-semibold mb-1">
          {product.name}
        </h3>
        <p className="text-gray-300 text-sm mb-2">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button
              onClick={handleDecrementQuantity}
              className="bg-gray-300 text-black py-1 px-2 rounded"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={() => {}}
              className="w-12 text-black p-2 text-center"
            />
            <button
              onClick={handleIncrementQuantity}
              className="bg-gray-300 text-black py-1 px-2 rounded"
            >
              +
            </button>
          </div>
          {showAnimation && (
            <div className="animate-bounce bg-green-500 text-white py-2 px-3 rounded absolute top-0 right-0">
              tenes {totalQuantity} {product.name} en el carrito
            </div>
          )}
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600 focus:outline-none"
          >
            <Image src={addToCartIcon} alt="Add to Cart" className="h-5 w-5" />
          </button>

          {/* Nuevo botón de edición */}
          <button
            onClick={() => onEditClick()}
            className="bg-yellow-500 text-white py-2 px-3 rounded hover:bg-yellow-600 focus:outline-none ml-2"
          >
            <MdEdit className="text-lg" />
          </button>
        </div>
        <Link href={`/product/${product.id}`}>
          <div className="text-blue-500 mt-2 hover:underline focus:outline-none">
            Ver detalles
            <Image
              src={details}
              alt="Details"
              className="h-4 w-4 ml-1 inline-block"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
