import React, { useState, useEffect } from "react";
import Link from "next/link";

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
    showLink ? "opacity-100" : "opacity-0"
  } transition-opacity duration-500 ease-in-out`;

  const buttonLabel = isCartPage ? "Confirmar Compra" : "Ver Carro";

  return (
    <div className={buttonClassName}>
      <Link href={destination} className="block">
        <button className="w-full">
          {buttonLabel} ({itemCount})
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
