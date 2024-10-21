import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import { fetchCategories } from "@/redux/actions/categoryAction";
import { addProduct } from "@/redux/actions/productAction";
import Spinner from "./Spinner";
import { convertToWebP } from "@/utils/ImageConversor";
import { setNotification } from "@/redux/slices/notificationSlice";

const AddProductForm: React.FC = () => {
  const [charCount, setCharCount] = useState(0);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [costPrice, setCostPrice] = useState(""); // Nuevo estado para costPrice
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(0);
  const [isImageProcessing, setIsImageProcessing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.category.categories);
  const router = useRouter();
  const userToken = useSelector((state: RootState) => state.user.token);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsImageProcessing(true);
      const webPImage = await convertToWebP(e.target.files[0]);
      webPImage ? setSelectedImage(webPImage) : dispatch(setNotification({ message: "No se pudo comprimir la imagen", type: "error" }));
      setIsImageProcessing(false);
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(parseInt(e.target.value, 10));
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
    formData.append("costPrice", costPrice); // Agregar costPrice al FormData

    formData.append("categoryId", selectedCategory !== undefined ? selectedCategory.toString() : "");

    if (selectedImage) {
      formData.append("productImage", selectedImage);
    }

    try {
      await dispatch(addProduct({ productData: formData, token: userToken }));
      // Resetear los campos después de agregar el producto
      setProductName("");
      setProductDescription("");
      setProductStock("");
      setProductPrice("");
      setCostPrice(""); // Resetear costPrice
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
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Nombre del Producto:
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                setCharCount(e.target.value.length);
              }}
              className="text-base p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
              placeholder="Nombre del Producto"
              maxLength={40}
            />
            <p className="text-sm text-gray-500">{`${charCount}/40 caracteres`}</p>
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Descripción del Producto:
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="text-base p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
              placeholder="Descripción del Producto"
            />
          </div>

          {/* Product Stock */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Stock del Producto:
            </label>
            <input
              type="text"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              className="text-base p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
              placeholder="Stock del Producto"
            />
          </div>
          {/* Cost Price */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Precio de Costo del Producto:
            </label>
            <input
              type="text"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              className="text-base p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
              placeholder="Precio de Costo del Producto"
            />
          </div>
          {/* Product Price */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Precio del Producto:
            </label>
            <input
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="text-base p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
              placeholder="Precio del Producto"
            />
          </div>



          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Categoría del Producto:
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="text-base p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
            >
              <option value={0}>Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Imagen del Producto:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-base p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
            />
            {selectedImage && !isImageProcessing && (
              <p className="text-sm mt-2">
                Archivo seleccionado: {selectedImage.name} <span role="img" aria-label="checked">✅</span>
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide
                      font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            {isLoading || isImageProcessing ? <Spinner /> : "Guardar Producto"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProductForm;
