"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BackIcon from "../public/back.svg";
import CartLink from "./CartLink";
import CartIcon from "./CartIcon";
import { logout } from "../redux/slices/userSlice";

import {
  MdClose,
  MdWork,
  MdList,
  MdExitToApp,
  MdSettings,
  MdLocationOn,
  MdMenu,
} from "react-icons/md";

const Navbar = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.user.user?.roleId);
  const userName = useSelector((state: RootState) => state.user.user?.name);

  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isIndexPage = pathname === "/";

  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <nav className="bg-verde text-crema px-6 flex justify-between items-center relative h-16">
      {menuOpen && (
        <div
          className="fixed inset-0 bg-carbon/60 z-40"
          onClick={toggleMenu}
        />
      )}

      {!isIndexPage ? (
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-crema/70 hover:text-crema transition-colors text-sm"
        >
          <Image src={BackIcon} alt="Volver" className="h-4 w-4 invert opacity-70" />
          <span>Volver</span>
        </button>
      ) : (
        <div className="w-16" />
      )}

      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/">
          <div className="w-11 h-11">
            <Image
              src="/pinta-bien.png"
              alt="Pinta Bien"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/cart">
          <CartIcon />
        </Link>

        {userName ? (
          <div className="relative z-50">
            <button
              className="text-crema/70 hover:text-crema transition-colors"
              onClick={toggleMenu}
            >
              <MdMenu size={26} />
            </button>

            <div
              className={`${
                menuOpen ? "translate-x-0" : "translate-x-full"
              } fixed top-0 right-0 h-full w-72 bg-white shadow-2xl p-6 transform transition-transform ease-in-out duration-300 z-50 flex flex-col`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-carbon/40 uppercase tracking-widest mb-0.5">
                    Hola,
                  </p>
                  <p className="font-display text-xl text-carbon">{userName}</p>
                </div>
                <button
                  className="text-carbon/30 hover:text-carbon transition-colors p-1"
                  onClick={toggleMenu}
                >
                  <MdClose size={20} />
                </button>
              </div>

              <div className="h-px bg-crema-dark mb-4" />

              <ul className="space-y-0.5 flex-1">
                <li>
                  <button
                    className="flex items-center gap-3 text-carbon/60 hover:text-verde hover:bg-verde-50 w-full py-2.5 px-3 rounded-lg transition-colors text-sm"
                    onClick={() => {
                      router.push("/donde-nos-encontramos");
                      toggleMenu();
                    }}
                  >
                    <MdLocationOn size={17} />
                    <span>Dónde nos encontramos</span>
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 text-carbon/60 hover:text-verde hover:bg-verde-50 w-full py-2.5 px-3 rounded-lg transition-colors text-sm"
                    onClick={() => {
                      router.push("/configuracion");
                      toggleMenu();
                    }}
                  >
                    <MdSettings size={17} />
                    <span>Configuración</span>
                  </button>
                </li>

                {(userRole === 1 || userRole === 4) && (
                  <>
                    <div className="h-px bg-crema-dark my-3" />
                    <li>
                      <button
                        className="flex items-center gap-3 text-carbon/60 hover:text-verde hover:bg-verde-50 w-full py-2.5 px-3 rounded-lg transition-colors text-sm"
                        onClick={() => {
                          router.push("/admin");
                          toggleMenu();
                        }}
                      >
                        <MdWork size={17} />
                        <span>Panel de Carga</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="flex items-center gap-3 text-carbon/60 hover:text-verde hover:bg-verde-50 w-full py-2.5 px-3 rounded-lg transition-colors text-sm"
                        onClick={() => {
                          router.push("/orders");
                          toggleMenu();
                        }}
                      >
                        <MdList size={17} />
                        <span>Manejo de Órdenes</span>
                      </button>
                    </li>
                  </>
                )}

                <div className="h-px bg-crema-dark my-3" />

                <li>
                  <button
                    className="flex items-center gap-3 text-red-400 hover:text-red-600 hover:bg-red-50 w-full py-2.5 px-3 rounded-lg transition-colors text-sm"
                    onClick={() => {
                      dispatch(logout());
                      toggleMenu();
                    }}
                  >
                    <MdExitToApp size={17} />
                    <span>Cerrar Sesión</span>
                  </button>
                </li>
              </ul>

              <div className="mt-auto pt-4 border-t border-crema-dark">
                <p className="text-xs text-carbon/30 text-center">Pinta Bien · Bebidas</p>
              </div>
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-crema/70 hover:text-crema text-sm transition-colors"
          >
            Ingresar
          </Link>
        )}
      </div>
    </nav>
  );
};

const NavbarWithCartButton = () => {
  const cartItems = useSelector((state: RootState) => state.cart.length);
  const pathname = usePathname();
  const isCartPage = pathname === "/cart";

  return (
    <div>
      <Navbar />
      {isCartPage && cartItems > 0 && <CartLink itemCount={cartItems} />}
    </div>
  );
};

export default NavbarWithCartButton;
