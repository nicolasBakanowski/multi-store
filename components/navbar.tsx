import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import BackIcon from "../public/back.svg";
import CartLink from "./CartLink";
import { MdClose } from "react-icons/md"; // Importa el icono de cierre

const Navbar = () => {
  const userRole = useSelector((state: RootState) => state.user.user?.roleId);
  const userName = useSelector((state: RootState) => state.user.user?.name);

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
        {userName ? (
          <div className="relative inline-block text-left z-50">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
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
              {/* Botón de cierre */}
              <button
                className="absolute top-2 right-2 text-gray-700"
                onClick={toggleMenu}
              >
                <MdClose size={24} />
              </button>
              {userRole === 1 && (
                <button
                  className="block py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    router.push("/admin");
                  }}
                >
                  Admin Panel
                </button>
              )}
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
  const destination = isCartPage ? "/checkout" : "/cart";
  return (
    <div>
      <Navbar />
      {cartItems > 0 && (
        <CartLink
          itemCount={cartItems}
          isCartPage={isCartPage}
          destination={destination}
        />
      )}
    </div>
  );
};

export default NavbarWithCartButton;
