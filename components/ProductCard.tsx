import React, { useState } from "react";
import { ProductCardProps, Product } from "../interfaces/Products";
import { setCurrentProduct } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { addItem } from "@/redux/slices/cartSlice";
import { CartItem } from "@/interfaces/Cart";
import { MdEdit, MdAddShoppingCart, MdOutlineExpandMore } from "react-icons/md";
import { RootState } from "@/redux/store";

const ProductCard: React.FC<ProductCardProps> = ({ product, onEditClick }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  // Obtener el rolId del usuario desde el estado
  const userRole = useSelector((state: RootState) => state.user.user?.roleId);

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
    <div className="w-full bg-violet-950 flex-grow shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl flex">
      <Link href={`/product/${product.id}`}>
        <button onClick={() => handleProductClick(product)} className="flex">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={190}
            height={130}
            className="h-45 w-45 h-[195px] object-cover rounded-l-xl "
          />
        </button>
      </Link>
      <div className="px-3 py-2 w-4/3 relative bottom-0">
        <h3 className="text-slate-300 text-lg font-semibold mb-1 ">
          {product.name}
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-0.5">
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
              onChange={() => { }}
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
              tienes {totalQuantity} {product.name} en el carrito
            </div>
          )}
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white py-2 px-3 mx-2 rounded hover:bg-green-600 focus:outline-none  "
          >
            <MdAddShoppingCart className="text-lg" />
          </button>

          {userRole === 1 && (
            <button
              onClick={() => onEditClick()}
              className="bg-yellow-500 text-white py-2 px-3 rounded hover:bg-yellow-600 "
            >
              <MdEdit className="text-lg" />
            </button>
          )}
        </div>
        <div className="py-3 absolute bottom-0">
          <Link href={`/product/${product.id}`}
            onClick={() => handleProductClick(product)}
          >
            <button
              onClick={() => handleProductClick(product)}
              className="flex items-center text-white rounded bg-gray-600 px-3 hover:bg-white hover:text-black focus:outline-none"
            >
              <span className="mr-2">Ver detalles</span>
              <MdOutlineExpandMore />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
