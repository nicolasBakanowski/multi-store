import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/actions/userAction";
import { useRouter } from "next/router";
import { RootState } from "../redux/store"; // Import the RootState

import Notification from "../components/Notification";

const Login = () => {
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
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-black flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-white">Login</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border text-black"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full text-black"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />
              <svg
                onClick={handleTogglePassword}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                viewBox="0 0 16 16"
              >
                {/* ... SVG path data */}
              </svg>
            </div>
            <button
              type="submit"
              className="bg-black rounded-xl border-white border py-2 text-white hover:scale-105 duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              {/* ... SVG path data */}
            </svg>
            Login with Google
          </button>

          <div className="mt-3 text-xs flex justify-between items-center text-white">
            <p>¿No tienes cuenta?</p>
            <button className="py-2 px-5 bg-white border text-black rounded-xl hover:scale-110 duration-300">
              Register
            </button>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Login"
          />
        </div>
      </div>
      <Notification /> {/* Add the notification component */}
    </section>
  );
};

export default Login;
