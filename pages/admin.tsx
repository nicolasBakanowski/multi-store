import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AddProductForm from "../components/AddProductForm";
import AddCategoryForm from "@/components/AddCategoryForm";
import createAxiosInstance from "../redux/axios.config";

const AdminPage = () => {
  const userRole = useSelector((state: RootState) => state.user.user?.roleId);

  const [selectedOption, setSelectedOption] = useState("category");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  if (userRole !== 1) {
    return <div>No tienes acceso a esta página.</div>;
  }

  return (
    <section className="flex flex-col items-center h-screen">
      <div className="mb-2">
      <button
          className={`${
            selectedOption === "category"
              ? "bg-green-500 text-white"
              : "bg-white text-gray-700"
          } px-4 py-2 rounded-l-full focus:outline-none`}
          onClick={() => handleOptionChange("category")}
        >
          Quiero cargar una categoría
        </button>
        <button
          className={`${
            selectedOption === "product"
              ? "bg-green-500 text-white"
              : "bg-white text-gray-700"
          } px-4 py-2 rounded-r-full focus:outline-none`}
          onClick={() => handleOptionChange("product")}
        >
          Quiero cargar un producto
        </button>
      </div>
      <div>
      {selectedOption === "category" ? <AddCategoryForm /> : <AddProductForm />}

      </div>
    </section>
  );
};

export default AdminPage;
