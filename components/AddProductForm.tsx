import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import { fetchCategories } from "@/redux/actions/categoryAction";
import { addProduct } from "@/redux/actions/productAction";

const AddProductForm: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    0
  );

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



  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(parseInt(e.target.value, 10)); // Parse the selected value to an integer (ID)
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userToken) {
      console.error("No se pudo agregar el producto debe volver a autenticarse");
      return;
    }
    if (selectedCategory === 0) {
      console.warn("Por favor, seleccione una categoría válida.");
      return;
    }
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("stock", productStock);
    formData.append("price", productPrice);

    formData.append(
      "categoryId",
      selectedCategory !== undefined ? selectedCategory.toString() : ""
    );

    if (selectedImage) {
      formData.append("productImage", selectedImage);
    }

    try {
      await dispatch(addProduct(formData, userToken));
      // Clear the form fields after successful submission
      setProductName("");
      setProductDescription("");
      setProductStock("");
      setProductPrice("");
      setSelectedImage(null);
      setSelectedCategory(undefined);
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
        <div>
          <label className="block text-white mb-2">Nombre del Producto:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="bg-white text-black p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Precio del Producto:</label>
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="bg-white text-black p-2 rounded w-full"
          />
        </div>
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
            value={selectedCategory || " "}
            onChange={handleCategoryChange} // Update the event handler
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
        <div>
          <label className="block text-white mb-2">
            Descripción del Producto:
          </label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="bg-white text-black p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Cantidad en Stock:</label>
          <input
            type="text"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            className="bg-white text-black p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none"
        >
          Guardar Producto
        </button>
      </form>
    </section>
  );
};

export default AddProductForm;
