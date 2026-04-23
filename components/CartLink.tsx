import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface CartLinkProps {
  itemCount: number;
}

const CartLink = ({ itemCount }: CartLinkProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`bg-ambar transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Link href="/checkout" className="block">
        <button className="w-full h-12 flex items-center justify-center gap-2 text-white font-semibold text-sm">
          <span>
            Ir al checkout · {itemCount}{" "}
            {itemCount === 1 ? "producto" : "productos"}
          </span>
          <FiArrowRight size={15} />
        </button>
      </Link>
    </div>
  );
};

export default CartLink;
