import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "@/redux/actions/categoryAction";
import { RootState } from "@/redux/store";
import { convertToWebP } from "../utils/ImageConversor"
import Spinner from './Spinner';
import { setNotification } from "@/redux/slices/notificationSlice";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state: RootState) => state.user.token);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading)
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryName);
    if (selectedImage) {
      formData.append("categoryImage", selectedImage);
    }

    try {
      if (userToken) {
        dispatch(addCategory({ categoryData: formData, userToken: userToken }) as any);
      } else {
        console.error("No se pudo agregar la categoría: token no disponible");
      }
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const webPImage = await convertToWebP(e.target.files[0]);
      webPImage ? setSelectedImage(webPImage) : dispatch(setNotification({ message: "Nose comprimio", type: "error" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Nombre de la Categoría:
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="text-base p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
              placeholder="Nombre de la Categoría"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Imagen de la Categoría:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-base p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
            />
            {selectedImage && (
              <p className="text-sm mt-2">
                Archivo seleccionado: {selectedImage.name}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide
                        font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            {isLoading ? <Spinner /> : "Guardar Categoría"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
