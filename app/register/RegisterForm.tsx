"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Notification from "@/components/Notification";
import { registerAction } from "@/app/actions/auth";

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerAction({ name, email, password, phone });
      router.push("/login");
    } catch {
      // error handled by notification slice
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-crema border border-crema-dark rounded-xl text-carbon text-sm placeholder-carbon/30 focus:outline-none focus:border-verde transition-colors";

  const labelClass =
    "text-xs font-medium text-carbon/50 uppercase tracking-wide block mb-1";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-verde mb-1">
            Crear Cuenta
          </h1>
          <p className="text-carbon/40 text-sm">
            Registrate para comenzar a comprar
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-crema-dark shadow-sm p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Nombre</label>
              <input
                className={inputClass}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                className={inputClass}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Teléfono</label>
              <input
                className={inputClass}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+54 9 ..."
                required
              />
            </div>
            <div>
              <label className={labelClass}>Contraseña</label>
              <div className="relative">
                <input
                  className={inputClass}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-carbon/30 hover:text-carbon transition-colors"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-verde text-crema py-3 rounded-xl text-sm font-semibold hover:bg-verde-light transition-colors mt-2"
            >
              Crear Cuenta
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-carbon/40">
            ¿Ya tenés cuenta?{" "}
            <Link
              href="/login"
              className="text-ambar hover:text-ambar-dark transition-colors font-medium"
            >
              Iniciá sesión
            </Link>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
