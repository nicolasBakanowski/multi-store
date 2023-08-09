import React, { useState } from "react";
import NavbarIcon from "../public/next.svg";
import Link from "next/link";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center">
      <div className={`${menuOpen ? "hidden" : "md:block"} text-2xl font-bold`}>
        Market
      </div>
      <ul
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex md:space-x-4 md:justify-center mt-4 md:mt-0`}
      >
        <li>
          <Link href="/" className="block md:inline">
            Categorias
          </Link>
        </li>
        <li>
          <Link href="/cart" className="block md:inline">
            Carrito
          </Link>
        </li>
      </ul>
      <button
        className="block md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
      >
        {menuOpen ? (
          <img src={NavbarIcon} alt="Close Icon" className="h-5 w-5" />
        ) : (
          <img src={NavbarIcon} alt="Menu Icon" className="h-5 w-5" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
