import { useState } from "react";

const FormCreateFolder = () => {
  const [folderName, setFolderName] = useState("");

  const handleFolderNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFolderName(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleCancel = () => {
    console.log("Formulario cancelado");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label
          htmlFor="folderName"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Nombre de carpeta
        </label>
        <input
          type="text"
          id="folderName"
          value={folderName}
          onChange={handleFolderNameChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-lg font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Crear
        </button>
      </div>
    </form>
  );
};

export default FormCreateFolder;
