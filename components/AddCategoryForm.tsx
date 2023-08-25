import React, { useState } from "react";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Categoría agregada:", categoryName);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    </section>
  );
};

export default AddCategoryForm;
