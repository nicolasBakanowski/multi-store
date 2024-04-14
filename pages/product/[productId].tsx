import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { Product } from "@/interfaces/Products";
import { RootState } from "@/redux/store";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (product: Product) => {
    const cartItem = { ...product, quantity };
    dispatch(addItem(cartItem));
  };

  const product = useSelector((state: RootState) => state.product.currentProduct);

  if (!product) {
    return <div>No hay producto...</div>;
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-w-screen min-h-screen flex items-center p-5 lg:p-10 overflow-hidden">
      <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10">
          <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <div className="relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={200}
                className="w-[600px] h-[400px] object-cover "
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10">
            <div className="mb-10">
              <h1 className="font-bold uppercase text-2xl mb-5">{product.name}</h1>
              <p className="text-sm">{product.description}</p>
            </div>
            <div className="flex items-center space-x-1 mt-4">
              <p className="text-gray-600 mr-2">Cantidad:</p>
              <button
                onClick={decreaseQuantity}
                className="bg-gray-300 text-black py-2 px-3 rounded-md hover:bg-gray-400 transition duration-300"
              >
                <span>-</span>
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-12 text-black p-2 text-center"
              />
              <button
                onClick={increaseQuantity}
                className="bg-gray-300 text-black py-2 px-3 rounded-md hover:bg-gray-400 transition duration-300"
              >
                <span>+</span>
              </button>
            </div>
            <div className="flex items-center mt-4 flex-col md:flex-row">
              <div className="inline-block align-bottom mr-5 mb-2 md:mb-0 md:mr-0">
                <span className="text-2xl leading-none align-baseline">$</span>
                <span className="font-bold text-5xl leading-none align-baseline">{product.price.toFixed(2)}</span>
              </div>
              <div className="inline-block align-bottom">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-500 opacity-75 hover:opacity-100 text-white hover:text-black rounded-full px-6 py-2 font-semibold md:ml-4"
                >
                  <i className="mdi mdi-cart -ml-2 mr-2"></i> Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
