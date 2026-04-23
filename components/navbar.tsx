"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  MdArrowBack,
} from "react-icons/md";

function DespachoLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="8" y="4" width="16" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="16" cy="4" rx="8" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="16" cy="28" rx="8" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h16M8 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 8c1.5 1.5 9.5 1.5 11 0M11 24c1.5-1.5 9.5-1.5 11 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

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
    <nav className="sticky top-0 z-50 glass-verde text-crema px-5 flex justify-between items-center h-16">
      {menuOpen && (
        <div
          className="fixed inset-x-0 top-24 bottom-0 bg-carbon/60 z-40 backdrop-blur-sm"
          onClick={toggleMenu}
        />
      )}

      {!isIndexPage ? (
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-crema/60 hover:text-crema transition-colors duration-200 text-sm cursor-pointer"
        >
          <MdArrowBack size={18} className="opacity-60" />
          <span className="hidden sm:inline">Volver</span>
        </button>
      ) : (
        <div className="w-16" />
      )}

      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/" className="flex items-center gap-2 group">
          <DespachoLogo className="w-7 h-7 text-ambar group-hover:text-ambar-light transition-colors duration-200" />
          <span className="font-display text-lg font-semibold text-crema tracking-wide leading-none group-hover:text-crema/90 transition-colors duration-200">
            Despacho
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/cart" className="cursor-pointer text-crema/75 hover:text-crema transition-colors duration-200">
          <CartIcon />
        </Link>

        {userName ? (
          <div className="relative z-50">
            <button
              className="w-9 h-9 rounded-full bg-crema/10 hover:bg-crema/20 border border-crema/15 flex items-center justify-center text-crema/75 hover:text-crema transition-all duration-200 cursor-pointer"
              onClick={toggleMenu}
            >
              <MdMenu size={20} />
            </button>

            <div
              className={`${
                menuOpen ? "translate-x-0" : "translate-x-full"
              } fixed top-24 right-0 bottom-0 w-72 glass-white shadow-2xl transform transition-transform ease-in-out duration-300 z-50 flex flex-col`}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-crema-dark/70">
                <div>
                  <p className="text-xs text-carbon/40 uppercase tracking-widest mb-0.5 font-medium">
                    Hola,
                  </p>
                  <p className="font-display text-2xl text-carbon">{userName}</p>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-crema hover:bg-crema-dark flex items-center justify-center text-carbon/40 hover:text-carbon transition-all duration-200 cursor-pointer"
                  onClick={toggleMenu}
                >
                  <MdClose size={16} />
                </button>
              </div>

              <ul className="space-y-0.5 flex-1 p-4">
                <li>
                  <button
                    className="flex items-center gap-3 text-carbon/60 hover:text-verde hover:bg-verde-50 w-full py-2.5 px-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                    onClick={() => { router.push("/donde-nos-encontramos"); toggleMenu(); }}
                  >
                    <MdLocationOn size={17} />
                    <span>Dónde nos encontramos</span>
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 text-carbon/60 hover:text-verde hover:bg-verde-50 w-full py-2.5 px-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                    onClick={() => { router.push("/configuracion"); toggleMenu(); }}
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
                        className="flex items-center gap-3 text-carbon/60 hover:text-verde hover:bg-verde-50 w-full py-2.5 px-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                        onClick={() => { router.push("/admin"); toggleMenu(); }}
                      >
                        <MdWork size={17} />
                        <span>Panel de Carga</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="flex items-center gap-3 text-carbon/60 hover:text-verde hover:bg-verde-50 w-full py-2.5 px-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                        onClick={() => { router.push("/orders"); toggleMenu(); }}
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
                    className="flex items-center gap-3 text-red-500 hover:text-red-700 hover:bg-red-50 w-full py-2.5 px-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                    onClick={() => { dispatch(logout()); toggleMenu(); }}
                  >
                    <MdExitToApp size={17} />
                    <span>Cerrar Sesión</span>
                  </button>
                </li>
              </ul>

              <div className="p-4 border-t border-crema-dark flex items-center justify-center gap-2">
                <DespachoLogo className="w-4 h-4 text-ambar" />
                <p className="text-xs text-carbon/35 font-display italic">Despacho</p>
              </div>
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-crema/70 hover:text-crema text-sm transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-crema/10 border border-transparent hover:border-crema/20"
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
