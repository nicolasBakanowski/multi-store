import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store"; // Asegúrate de que AppDispatch esté exportado correctamente
import { fetchCategories } from "@/redux/actions/categoryAction";

const AddProductForm: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  useEffect(() => {
    if (!categories) {
      setIsLoading(true);
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Rest of your submission logic

    console.log(
      "Product added:",
      productName,
      productPrice,
      selectedImage,
      selectedCategory
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-white mb-2">Nombre del Producto:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="bg-white text-black p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Precio del Producto:</label>
        <input
          type="text"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="bg-white text-black p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Imagen del Producto:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Categoría del Producto:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value={selectedCategory}>Seleccionar Categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-black text-white border border-white py-2 px-4 rounded"
      >
        Guardar Producto
      </button>
    </form>
  );
};

export default AddProductForm;
