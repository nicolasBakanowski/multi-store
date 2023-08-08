import { useState } from "react";
import { useRouter } from "next/router";
import FormCreateFolder from "@/components/FormCreateFolder";

const FolderPage = () => {
  const router = useRouter();
  const { folderName } = router.query;

  if (folderName === "new") {
    return <FormCreateFolder />;
  }
  const createNewDocument = () => {
    router.push(`/file/new`);
  };
  return (
    <div>
      {!folderName ? null : (
        <>
          <h1>Contenido de la carpeta: {folderName}</h1>
          <div
            className="document"
            onClick={() => {
              createNewDocument();
            }}
          >
            <div className="flex items-center justify-center w-20 h-20 bg-blue-500 text-white">
              <span className="text-3xl">+</span>
            </div>
            <div className="mt-2">Agregar documento</div>
          </div>
        </>
      )}
    </div>
  );
};

export default FolderPage;
