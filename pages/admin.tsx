import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AddProductForm from "../components/AddProductForm";
import AddCategoryForm from "@/components/AddCategoryForm";

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
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        <button
          className={`${
            selectedOption === "category"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } px-4 py-2 rounded-l focus:outline-none`}
          onClick={() => handleOptionChange("category")}
        >
          Quiero cargar una categoría
        </button>
        <button
          className={`${
            selectedOption === "product"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } px-4 py-2 rounded-r focus:outline-none`}
          onClick={() => handleOptionChange("product")}
        >
          Quiero cargar un producto
        </button>
      </div>
      {selectedOption === "category" ? <AddCategoryForm /> : <AddProductForm />}
    </section>
  );
};

export default AdminPage;
