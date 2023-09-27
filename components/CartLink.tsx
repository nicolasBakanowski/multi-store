import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart, FaCheck } from "react-icons/fa"; // Importa íconos

const CartLink = ({ itemCount, isCartPage, destination }: CartLinkProps) => {
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLink(true);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const buttonClassName = `bg-${
    isCartPage ? "green" : "blue"
  }-500 text-white py-2 ${
    showLink ? "opacity-100 hover:shadow-md" : "opacity-70 hover:opacity-100"
  } transition-opacity duration-500 ease-in-out cursor-pointer`;

  const buttonLabel = isCartPage
    ? "Confirmar Compra"
    : "Ingresar al carrito de compras";

  const icon = isCartPage ? <FaCheck /> : <FaShoppingCart />; // Ícono relacionado

  return (
    <div className={buttonClassName}>
      <Link href={destination} className="block">
        <button className="w-full h-12 flex items-center justify-center space-x-2">
          {icon}
          <span className="text-lg">
            {buttonLabel} ({itemCount} Productos)
          </span>
        </button>
      </Link>
    </div>
  );
};

interface CartLinkProps {
  itemCount: number;
  isCartPage: boolean;
  destination: string;
}

export default CartLink;
