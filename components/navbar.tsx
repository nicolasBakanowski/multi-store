import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import BackIcon from "../public/back.svg";
import CartLink from "./CartLink";
import CartIcon from "./CartIcon";
import { logout } from "../redux/slices/userSlice";

import {
  MdClose,
  MdWork,
  MdList,
  MdExitToApp,
  MdIron,
  MdMenu,
  MdShoppingCart,
} from "react-icons/md";

const Navbar = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.user.user?.roleId);
  const userName = useSelector((state: RootState) => state.user.user?.name);

  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const isIndexPage = router.pathname === "/";
  const cartItems = useSelector((state: RootState) => state.cart.length);

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
      <div className="flex items-center space-x-5">
        <Link href="/cart">
          <div className="text-2xl font-bold flex items-center space-x-1">
            <CartIcon />
          </div>
        </Link>
        {userName ? (
          <div className="relative inline-block text-left z-50">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-1" onClick={openMenu}>
                <MdMenu size={40} className="pt-2" />
              </div>
            </button>
            {/* Menú lateral */}
            <div
              className={`${menuOpen ? "translate-x-0" : "translate-x-full"
                } fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 transform transition-transform ease-in-out duration-300 z-50`}
            >
              {/* Botón de cierre */}
              <div className="flex items-center pb-6">
                <span className="text-gray-950">{userName}</span>
                <button className="text-gray-700 pl-10" onClick={toggleMenu}>
                  <MdClose size={24} />
                </button>
              </div>

              {/* Opciones del menú */}
              <ul>
                {/* Configuración */}
                <li className="mb-2">
                  <button
                    className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 py-2 rounded-lg"
                    onClick={() => {
                      // Agrega la lógica para la página de configuración
                      router.push("/configuracion");
                      toggleMenu();
                    }}
                  >
                    {/* Agrega el ícono correspondiente */}
                    <MdIron size={20} />{" "}
                    {/* Reemplaza MdIcon con el ícono que desees */}
                    <span>Configuración</span>
                  </button>
                </li>
                {/* Dónde nos encontramos */}
                <li className="mb-2">
                  <button
                    className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 py-2 rounded-lg"
                    onClick={() => {
                      router.push("/donde-nos-encontramos");
                      toggleMenu();
                    }}
                  >
                    <MdIron size={20} /> <span>Dónde nos encontramos</span>
                  </button>
                </li>

                {userRole === 1 && (
                  <li className="mb-2  py-2 border-t border-gray-300 my-5">
                    <button
                      className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 py-2 rounded-lg"
                      onClick={() => {
                        router.push("/admin");
                        toggleMenu();
                      }}
                    >
                      <MdWork size={20} />
                      <span>Panel de Carga</span>
                    </button>
                  </li>
                )}
                {userRole === 1 && (
                  <li className="mb-2">
                    <button
                      className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 py-2  rounded-lg"
                      onClick={() => {
                        router.push("/orders");
                        toggleMenu();
                      }}
                    >
                      <MdList size={20} />
                      <span>Manejo de Ordenes</span>
                    </button>
                  </li>
                )}
                {userRole === 1 && (
                  <li className="mb-2">
                    <button
                      className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 py-2  rounded-lg"
                      onClick={() => {
                        router.push("/orders");
                        toggleMenu();
                      }}
                    >
                      <MdList size={20} />
                      <span>Productos deshabilitados</span>
                    </button>
                  </li>
                )}
                {/* Separador */}
                <div className="border-t border-gray-300 my-4"></div>

                {/* Cerrar Sesión */}
                <li>
                  <button
                    className="flex items-center space-x-2 text-red-600 hover:bg-gray-100 py-2 px-3 rounded-lg"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <MdExitToApp size={20} />
                    <span>Cerrar Sesión</span>
                  </button>
                </li>
              </ul>
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

  return (
    <div>
      <Navbar />
      {isCartPage && cartItems > 0 && (
        <CartLink itemCount={cartItems} />
      )}
    </div>
  );
};

export default NavbarWithCartButton;

