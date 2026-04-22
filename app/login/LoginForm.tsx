"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Notification from "@/components/Notification";
import { loginAction } from "@/app/actions/auth";
import { setUserInfoAndToken } from "@/redux/slices/userSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { user, token } = await loginAction({ email, password });
      dispatch(setUserInfoAndToken({ user, token }) as any);
      router.push("/");
    } catch {
      // el Notification slice se sigue usando desde thunks hoy;
      // en esta migración inicial mantenemos UI sin agregar lógica extra acá.
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="p-2 mt-2 rounded-xl border focus:outline-none"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electrónico"
            required
          />
          <div className="relative">
            <input
              className="p-2 rounded-xl border w-full focus:outline-none"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600 text-center">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
      <Notification />
    </div>
  );
}

