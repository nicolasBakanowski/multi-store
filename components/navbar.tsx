import React, { useState, useEffect } from "react";
import NavbarIcon from "../public/hamburger.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartIcon from "../public/cart.svg";
import HomeIcon from "../public/home.svg";
import BackIcon from "../public/back.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.length);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenuOnResize = () => {
    if (window.innerWidth >= 768) {
      setMenuOpen(false);
    }
  };
  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    window.addEventListener("resize", closeMenuOnResize);
    return () => {
      window.removeEventListener("resize", closeMenuOnResize);
    };
  }, []);
  const router = useRouter();
  const isIndexPage = router.pathname === "/";
  return (
    <div>
      <nav className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <div
          className={`${menuOpen ? "hidden" : "md:block"} text-2xl font-bold`}
        >
          Market
        </div>
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-4 md:justify-center mt-4 md:mt-0`}
        >
          <li>
            <Link href="/" className="block md:inline">
              <Image
                src={HomeIcon}
                alt="Home Icon"
                className="h-7 w-7 bottom-10"
              />
            </Link>
          </li>
          <li>
            <Link href="/cart" className="block md:inline">
              <div className="relative">
                <Image
                  src={CartIcon}
                  alt="Cart Icon"
                  className="top-4 h-8 w-8"
                />
                {cartItems > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white rounded-full p-0.5 text-xs">
                    {cartItems}
                  </span>
                )}
              </div>
            </Link>
          </li>
        </ul>
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <Image src={NavbarIcon} alt="Close Icon" className="h-7 w-7" />
          ) : (
            <Image src={NavbarIcon} alt="Menu Icon" className="h-7 w-7" />
          )}
        </button>
        {!isIndexPage && (
          <div
            className={`absolute ${
              menuOpen ? "top-32 md:top-20" : "top-20"
            } left-8`}
          >
            <button onClick={handleGoBack}>
              <div className="flex items-center space-x-1">
                <Image src={BackIcon} alt="Back Icon" className="h-6 w-6" />
                <span>Volver</span>
              </div>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
