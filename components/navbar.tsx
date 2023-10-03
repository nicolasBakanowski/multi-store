import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import BackIcon from "../public/back.svg";
import AdminIcon from "../public/login.svg";
import CartLink from "./CartLink";

const Navbar = () => {
  const userRole = useSelector((state: RootState) => state.user.user?.roleId);
  const userName = useSelector((state: RootState) => state.user.user?.name);
  const cartItems = useSelector((state: RootState) => state.cart.length);

  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú lateral
  const router = useRouter();
  const isIndexPage = router.pathname === "/";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center relative">
      {/* Fondo oscuro */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}

      {!isIndexPage ? (
        <button onClick={() => router.back()}>
          <div className="flex items-center">
            <Image src={BackIcon} alt="Back Icon" className="h-6 w-6" />
            <span>Volver</span>
          </div>
        </button>
      ) : (
        <button>
          <div className="flex items-center px-9"></div>
        </button>
      )}
      <div className="text-2xl font-bold flex w-1/3 justify-center">
        <Link href="/">Market</Link>
      </div>
      <div className="flex items-center space-x-4">
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
        {userName ? (
          <div className="relative inline-block text-left z-50">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
              onBlur={() => setMenuOpen(false)}
            >
              <div className="flex items-center space-x-1" onClick={openMenu}>
                <span>{userName}</span>
              </div>
            </button>
            {/* Menú lateral */}
            <div
              className={`${
                menuOpen ? "translate-x-0" : "translate-x-full"
              } fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 transform transition-transform ease-in-out duration-300 z-50`}
            >
              <a
                href="#"
                className="block py-2 text-gray-700 hover:bg-gray-100"
              >
                Configuraciones
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:bg-gray-100"
              >
                Cerrar sesión
              </a>
            </div>
          </div>
        ) : (
          <Link href="/login" className="block md:inline">
            <button className="text-white focus:outline-none">
              <div className="flex items-center space-x-1">
                <span>Login</span>
              </div>
            </button>
          </Link>
        )}
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
