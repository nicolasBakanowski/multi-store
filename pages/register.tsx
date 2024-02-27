import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAction } from "@/redux/actions/userAction";
import { useRouter } from "next/router";
import Notification from "@/components/Notification";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await dispatch(
      registerAction({ name, email, password, phone }) as any
    );
    if (success) {
      router.push("/login");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-8 md:p-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create una Cuenta
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="p-3 rounded-lg border outline-none focus:border-blue-500"
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            required
          />
          <input
            className="p-3 rounded-lg border outline-none focus:border-blue-500"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
          <input
            className="p-3 rounded-lg border outline-none focus:border-blue-500"
            type="text"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Phone"
            required
          />
          <div className="relative">
            <input
              className="p-3 rounded-lg border w-full outline-none focus:border-blue-500"
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
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
      <Notification />
    </section>
  );
};

export default RegisterPage;
