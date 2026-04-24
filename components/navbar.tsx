"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";
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
    <nav className="sticky top-0 z-50 glass-verde text-vb-crema px-5 flex justify-between items-center h-16 relative overflow-hidden">
      {/* fondo sutil para que el logo “asiente” mejor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(520px 80px at 50% 110%, rgba(245,201,106,0.22), rgba(232,149,42,0.10) 40%, rgba(28,10,0,0) 70%)",
        }}
      />
      {menuOpen && (
        <div
          className="fixed inset-x-0 top-28 bottom-0 bg-vb-negro/60 z-30 backdrop-blur-sm"
          onClick={toggleMenu}
        />
      )}

      {!isIndexPage ? (
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-vb-crema/70 hover:text-vb-crema transition-colors duration-200 text-sm cursor-pointer"
        >
          <MdArrowBack size={18} className="opacity-60" />
          <span className="hidden sm:inline">Volver</span>
        </button>
      ) : (
        <div className="w-16" />
      )}

      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="relative block h-12 w-[280px] max-w-[72vw]">
            {/* halo cálido detrás del logo (sin “card”) */}
            <span
              aria-hidden
              className="absolute inset-x-6 inset-y-2 rounded-full bg-vb-dorado/15 blur-[10px]"
            />
            <Image
              src="/icons/vueltabuena_navbar.svg"
              alt="La Vuelta Buena"
              fill
              sizes="(max-width: 640px) 72vw, 280px"
              className="object-contain scale-[1.05] origin-center drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]"
              priority
            />
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/cart" className="cursor-pointer text-vb-crema/80 hover:text-vb-crema transition-colors duration-200">
          <CartIcon />
        </Link>

        {userName ? (
          <div className="relative z-50">
            <button
              className="w-9 h-9 rounded-full bg-vb-crema/10 hover:bg-vb-crema/15 border border-vb-dorado/20 flex items-center justify-center text-vb-crema/85 hover:text-vb-crema transition-all duration-200 cursor-pointer"
              onClick={toggleMenu}
            >
              <MdMenu size={20} />
            </button>

            <div
              className={`${
                menuOpen ? "translate-x-0" : "translate-x-full"
              } fixed top-24 right-0 bottom-0 w-72 glass-white shadow-2xl transform transition-transform ease-in-out duration-300 z-50 flex flex-col`}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
                <div>
                  <p className="text-xs text-vb-negro/45 uppercase tracking-widest mb-0.5 font-medium">
                    Hola,
                  </p>
                  <p className="font-display text-2xl text-vb-negro">{userName}</p>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-vb-crema hover:bg-vb-crema/80 flex items-center justify-center text-vb-negro/45 hover:text-vb-negro transition-all duration-200 cursor-pointer"
                  onClick={toggleMenu}
                >
                  <MdClose size={16} />
                </button>
              </div>

              <ul className="space-y-0.5 flex-1 p-4">
                <li>
                  <button
                    className="flex items-center gap-3 text-vb-negro/70 hover:text-vb-negro hover:bg-vb-ambar/10 w-full py-2.5 px-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                    onClick={() => { router.push("/donde-nos-encontramos"); toggleMenu(); }}
                  >
                    <MdLocationOn size={17} />
                    <span>Dónde nos encontramos</span>
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 text-vb-negro/70 hover:text-vb-negro hover:bg-vb-ambar/10 w-full py-2.5 px-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                    onClick={() => { router.push("/configuracion"); toggleMenu(); }}
                  >
                    <MdSettings size={17} />
                    <span>Configuración</span>
                  </button>
                </li>

                {(userRole === 1 || userRole === 4) && (
                  <>
                    <div className="h-px bg-black/5 my-3" />
                    <li>
                      <button
                        className="flex items-center gap-3 text-vb-negro/70 hover:text-vb-negro hover:bg-vb-ambar/10 w-full py-2.5 px-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                        onClick={() => { router.push("/admin"); toggleMenu(); }}
                      >
                        <MdWork size={17} />
                        <span>Panel de Carga</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="flex items-center gap-3 text-vb-negro/70 hover:text-vb-negro hover:bg-vb-ambar/10 w-full py-2.5 px-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                        onClick={() => { router.push("/orders"); toggleMenu(); }}
                      >
                        <MdList size={17} />
                        <span>Manejo de Órdenes</span>
                      </button>
                    </li>
                  </>
                )}

                <div className="h-px bg-black/5 my-3" />

                <li>
                  <button
                    className="flex items-center gap-3 text-vb-rojo hover:text-vb-negro hover:bg-vb-rojo/10 w-full py-2.5 px-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                    onClick={() => { dispatch(logout()); toggleMenu(); }}
                  >
                    <MdExitToApp size={17} />
                    <span>Cerrar Sesión</span>
                  </button>
                </li>
              </ul>

              <div className="p-4 border-t border-black/5 flex items-center justify-center gap-2">
                <Image src="/icons/vueltabuena_icono.svg" alt="" width={16} height={16} className="w-4 h-4" />
                <p className="text-xs text-vb-negro/45 font-display italic">La Vuelta Buena</p>
              </div>
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-vb-crema/75 hover:text-vb-crema text-sm transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-vb-crema/10 border border-transparent hover:border-vb-dorado/25"
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
