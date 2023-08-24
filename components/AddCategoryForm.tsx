import React, { ReactElement, useState } from "react";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Categoría agregada:", categoryName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-white mb-2">Nombre de la Categoría:</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="bg-white text-black p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white border border-white py-2 px-4 rounded"
      >
        Guardar Categoría
      </button>
    </form>
  );
};

export default AddCategoryForm;
