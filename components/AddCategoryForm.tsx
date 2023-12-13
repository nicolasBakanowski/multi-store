// AddCategoryForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "@/redux/actions/categoryAction";
import { RootState } from "@/redux/store";
import { setNotification } from "../redux/slices/notificationSlice";
import Notification from "../components/Notification";

const AddCategoryForm: React.FC = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state: RootState) => state.user.token);
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Función para mostrar notificaciones
  const showNotification = (message: string, type: "success" | "error") => {
    dispatch(setNotification({ message, type }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userToken) {
      console.error("No se pudo agregar la categoría: token no disponible");
      showNotification("Error: Token no disponible", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    if (selectedImage) {
      formData.append("categoryImage", selectedImage);
    }

    try {
      const newCategory = await dispatch(
        addCategory(formData, userToken) as any
      );
      newCategory
        ? showNotification("Categoría agregada con éxito", "success")
        : showNotification("No se pudo crear la Categoria", "error");
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
      showNotification("Error al agregar la categoría", "error");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">
            Nombre de la Categoría:
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="bg-white text-black p-2 rounded w-full"
          />
        </div>
        <div className="relative">
          <label className="block text-white mb-2">
            Imagen de la Categoría:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-white text-black p-2 rounded w-full"
          />
          {selectedImage && (
            <p className="text-white text-sm relative top-full mt-2">
              Archivo seleccionado: {selectedImage.name}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none"
        >
          Guardar Categoría
        </button>
      </form>
      <Notification />
    </section>
  );
};

export default AddCategoryForm;
