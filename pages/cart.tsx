import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { removeItem, discountProduct, clearCart } from "@/redux/slices/cartSlice";
import { CartItem } from "../interfaces/Cart";
const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const [productToRemove, setProductToRemove] = useState<CartItem | null>(null);
  const [confirmRemoveAll, setConfirmRemoveAll] = useState(false);


  const handleRemoveFromCart = (product: CartItem) => {
    if (product.quantity > 1) {
      dispatch(discountProduct(product.id));
    } else {
      setProductToRemove(product);
      setConfirmRemoveAll(true);
    }
    setProductToRemove(null);
  };

  const handleRemoveAllQantity = (product: CartItem) => {
    setProductToRemove(product);
    setConfirmRemoveAll(true);
  }

  const handleConfirmRemove = () => {
    if (productToRemove) {
      handleRemoveFromCart(productToRemove);
    }
  };

  const handleConfirmRemoveAll = () => {
    if (productToRemove) {
      dispatch(removeItem(productToRemove.id));
      setProductToRemove(null);
      setConfirmRemoveAll(false);      
    }
  };

  const handleCancelRemoveAll = () => {
    setConfirmRemoveAll(false);
    setProductToRemove(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-center">
      <div className="container p-3">
        <h1 className="text-2xl font-semibold mb-4">Carrito de Compras</h1>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cart.map((product: CartItem) => (
              <li key={product.id} className="border p-4 rounded-md shadow-md">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={140}
                  height={120}
                  className="w-full h-44 object-cover mb-2"
                />
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">
                  ${(product.price * product.quantity).toFixed(2)}
                </p>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-600 mb-2">
                  Cantidad en carrito: {product.quantity}
                </p>
                <button
                  onClick={() => setProductToRemove(product)}
                  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                >
                  Quitar del Carro
                </button>
                <button
                  onClick={() => handleRemoveAllQantity(product)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Eliminar producto
                </button>
              </li>
            ))}
          </ul>
        )}
        {/* Modal de Confirmación */}
        {productToRemove && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md">
              <p>
                ¿Estás seguro de que deseas quitar 1 unidad de{" "}
                {productToRemove.name} del carrito?
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setProductToRemove(null)}
                  className="bg-gray-300 text-black px-3 py-1 rounded-md mr-2 hover:bg-gray-400 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmRemove}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal para la confirmación de eliminación de todas las unidades */}
        {confirmRemoveAll && productToRemove && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md">
              <p>
                ¿Estás seguro de que deseas quitar todas las unidades de{" "}
                {productToRemove.name} del carrito?
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCancelRemoveAll}
                  className="bg-gray-300 text-black px-3 py-1 rounded-md mr-2 hover:bg-gray-400 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmRemoveAll}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
