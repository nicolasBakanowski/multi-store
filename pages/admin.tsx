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
    <section className="min-h-screen bg-gray-900 flex pb-40 items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl bg-black rounded-2xl shadow-lg mx-auto p-5 md:p-10">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 px-8 mb-4 md:mb-0">
              <p className="text-white mb-4">
                Asegúrate de cargar las categorías antes de agregar productos,
                ya que los productos dependen de las categorías existentes.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  className={`flex-1 p-2 rounded-xl border ${
                    selectedOption === "category" ? "border-blue-500" : ""
                  } text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none transition mb-2 md:mb-0 md:mr-2`}
                  onClick={() => handleOptionChange("category")}
                >
                  Formulario de categoría
                </button>
                <button
                  className={`flex-1 p-2 rounded-xl border ${
                    selectedOption === "product" ? "border-blue-500" : ""
                  } text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none transition`}
                  onClick={() => handleOptionChange("product")}
                >
                  Formulario de producto
                </button>
              </div>
            </div>

            <div className="md:w-1/2 px-8">
              {selectedOption === "category" ? (
                <AddCategoryForm />
              ) : (
                <AddProductForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
