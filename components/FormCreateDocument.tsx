import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/routeReducer";
import { useRouter } from "next/router";

const FormCreateDocument = () => {
  const [pageName, setPageName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const currentFolder = useSelector(
    (state: RootState) => state.folders.currentFolder
  );

  const handlePageNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (
        selectedFile.type.startsWith("text/") ||
        selectedFile.type === "application/pdf"
      ) {
        setFile(selectedFile);
      } else {
        alert("Por favor, selecciona un archivo de texto o un archivo PDF.");
        event.target.value = "";
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      console.log("Enviando archivo al servidor:", file);
    }
  };

  const handleCancel = () => {
    console.log("Formulario cancelado");
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label
          htmlFor="pageName"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Nombre del documento
        </label>
        <input
          type="text"
          id="pageName"
          value={pageName}
          onChange={handlePageNameChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="fileInput"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Archivo
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          className="w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="folderSelect"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          Carpeta actual: {currentFolder.name}
        </label>
        <p>ID de carpeta: {currentFolder.folderId}</p>
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

export default FormCreateDocument;
