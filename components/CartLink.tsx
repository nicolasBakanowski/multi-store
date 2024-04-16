import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa"; // Único ícono necesario

const CartLink = ({ itemCount }: CartLinkProps) => {
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLink(true);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const buttonClassName = `bg-green-500 text-white py-2 ${showLink ? "opacity-100 hover:shadow-md" : "opacity-70 hover:opacity-100"
    } transition-opacity duration-500 ease-in-out cursor-pointer`;

  return (
    <div className={buttonClassName}>
      <Link href="/checkout" className="block">
        <button className="w-full h-12 flex items-center justify-center space-x-2">
          <FaCheck />
          <span className="text-lg">Confirmar Compra ({itemCount} Productos)</span>
        </button>
      </Link>
    </div>
  );
};

interface CartLinkProps {
  itemCount: number;
}

export default CartLink;
