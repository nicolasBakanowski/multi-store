import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "@/redux/actions/userAction";
import { RootState } from "@/redux/store";
import Notification from "@/components/Notification";
import Link from "next/link";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await dispatch(loginAction({ email, password }) as any);
    if (success) {
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Usuario autenticado con Google:", user);

      router.push("/");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-violet-950 text-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Correo Electrónico"
            required
          />
          <div className="relative">
            <input
              className="p-3 rounded-md border border-gray-300 text-black w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Contraseña"
              required
            />
            <button
              onClick={handleTogglePassword}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none text-gray-600"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none transition-colors"
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-white text-black py-2 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none transition-colors"
          >
            <FcGoogle className="text-2xl" />
            Iniciar sesión con Google
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-200 text-center">
          ¿No tienes cuenta?{" "}
          <Link href="/register" passHref>
            <span className="text-blue-300 hover:underline cursor-pointer">
              Regístrate aquí
            </span>
          </Link>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default LoginPage;
