import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import { fetchCategories } from "@/redux/actions/categoryAction";
import { addProduct } from "@/redux/actions/productAction";
import { setNotification } from "../redux/slices/notificationSlice";
import Notification from "../components/Notification";

const AddProductForm: React.FC = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | string>(""); // Cambiado a un string para manejar el caso de "Seleccionar Categoría"

  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const router = useRouter();
  const userToken = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const showNotification = (message: string, type: "success" | "error") => {
    dispatch(setNotification({ message, type }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userToken) {
      console.error(
        "No se pudo agregar el producto debe volver a autenticarse"
      );
      return;
    }

    if (!selectedCategory) {
      console.warn("Por favor, seleccione una categoría válida.");
      return;
    }

    const formData = new FormData();
    selectedCategory &&
      formData.append("categoryId", selectedCategory.toString());

    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (selectedImage) {
      formData.append("productImage", selectedImage);
    }

    try {
      const newProduct = await dispatch(addProduct(formData, userToken));
      if (newProduct) {
        showNotification("Producto agregada con éxito", "success");
        setProductData({
          name: "",
          description: "",
          stock: "",
          price: "",
        });
        setSelectedImage(null);
        setSelectedCategory("");
      } else {
        showNotification("No se pudo crear el producto", "error");
      }
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  if (!categories) {
    return <p>Loading...</p>;
  }

  return (
    <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(productData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-white mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            {key === "description" ? (
              <textarea
                name={key}
                value={value}
                onChange={handleInputChange}
                className="bg-white text-black p-2 rounded w-full"
              />
            ) : (
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleInputChange}
                className="bg-white text-black p-2 rounded w-full"
              />
            )}
          </div>
        ))}
        <div className="relative">
          <label className="block text-white mb-2">Imagen del Producto:</label>
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
        <div>
          <label className="block text-white mt-3 mb-2">
            Categoría del Producto:
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="bg-white text-black p-2 rounded w-full"
          >
            <option value="">Seleccionar Categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none"
        >
          Guardar Producto
        </button>
      </form>
      <Notification />
    </section>
  );
};

export default AddProductForm;
