import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "@/redux/actions/userAction";
import { RootState } from "@/redux/store";
import Notification from "@/components/Notification";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

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
      router.push("/"); // Redirect to the home page after successful login
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
            onChange={handleEmailChange}
            placeholder="Correo Electrónico"
            required
          />
          <div className="relative">
            <input
              className="p-2 rounded-xl border w-full focus:outline-none"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Contraseña"
              required
            />
            <button
              onClick={handleTogglePassword}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
            ></button>
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
          <Link href="/register" passHref>
            <div className="text-blue-500 hover:underline text-center">
              Regístrate aquí
            </div>
          </Link>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default LoginPage;
