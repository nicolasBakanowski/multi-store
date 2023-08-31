import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NavbarIcon from "../public/hamburger.svg";
import HomeIcon from "../public/home.svg";
import BackIcon from "../public/back.svg";
import LoginIcon from "../public/login.svg";
import AdminIcon from "../public/login.svg"; // Reemplaza por el ícono correcto si lo tienes
import CartLink from "./CartLink";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.length);
  const userRole = useSelector((state: RootState) => state.user.user?.roleId);

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
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        Market
      </Link>
      <div className="flex items-center space-x-4">
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-4 md:justify-center mt-4 md:mt-0`}
        >
          <li>
            <Link href="/" className="block md:inline">
              <Image src={HomeIcon} alt="Home Icon" className="h-7 w-7" />
            </Link>
          </li>
        </ul>
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <Image
            src={NavbarIcon}
            alt={menuOpen ? "Close Icon" : "Menu Icon"}
            className="h-7 w-7"
          />
        </button>
        {!isIndexPage && (
          <button onClick={handleGoBack}>
            <div className="flex items-center space-x-1">
              <Image src={BackIcon} alt="Back Icon" className="h-6 w-6" />
              <span>Volver</span>
            </div>
          </button>
        )}
        {userRole === 1 && (
          <Link href="/admin" className="block md:inline">
            <button className="text-white focus:outline-none">
              <div className="flex items-center space-x-1">
                <Image
                  src={AdminIcon}
                  alt="Admin Panel Icon"
                  className="h-6 w-6"
                />
                <span>Admin Panel</span>
              </div>
            </button>
          </Link>
        )}
        <Link href="/login" className="block md:inline">
          <button className="text-white focus:outline-none">
            <div className="flex items-center space-x-1">
              <Image src={LoginIcon} alt="Login Icon" className="h-6 w-6" />
              <span>Login</span>
            </div>
          </button>
        </Link>
      </div>
    </nav>
  );
};

const NavbarWithCartButton = () => {
  const cartItems = useSelector((state: RootState) => state.cart.length);
  const router = useRouter();
  const isCartPage = router.pathname === "/cart";
  const distination = isCartPage ? "/checkout" : "/cart";
  return (
    <div>
      <Navbar />
      {cartItems > 0 && (
        <CartLink
          itemCount={cartItems}
          isCartPage={isCartPage}
          destination={distination}
        />
      )}
    </div>
  );
};

export default NavbarWithCartButton;
