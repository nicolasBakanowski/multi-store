import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

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
        visible ? "opacity-100" : "opacity-70"
      }`}
    >
      <Link href="/checkout" className="block">
        <button className="w-full h-12 flex items-center justify-center gap-2 text-white font-semibold text-sm">
          <FaCheck size={13} />
          <span>
            Confirmar Compra · {itemCount}{" "}
            {itemCount === 1 ? "producto" : "productos"}
          </span>
        </button>
      </Link>
    </div>
  );
};

export default CartLink;
