"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { convertToWebP } from "@/utils/ImageConversor";
import Spinner from "./Spinner";
import { setNotification } from "@/redux/slices/notificationSlice";
import { addBrand } from "@/app/actions/brand";

const AddBrandForm = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state: RootState) => state.user.token);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isImageProcessing, setIsImageProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userToken) {
      dispatch(
        setNotification({
          message: "Tenés que volver a iniciar sesión.",
          type: "error",
        })
      );
      return;
    }
    if (!brandName.trim()) {
      dispatch(
        setNotification({
          message: "El nombre de la marca es obligatorio.",
          type: "error",
        })
      );
      return;
    }
    if (!selectedImage || isImageProcessing) {
      dispatch(
        setNotification({
          message: "La imagen de la marca es obligatoria.",
          type: "error",
        })
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", brandName.trim());
    formData.append("brandImage", selectedImage);

    try {
      setIsSubmitting(true);
      await addBrand({ brandData: formData, token: userToken });
      setBrandName("");
      setSelectedImage(null);
      dispatch(
        setNotification({ message: "Marca creada con éxito.", type: "success" })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          message: error?.message || "No se pudo crear la marca.",
          type: "error",
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsImageProcessing(true);
      const webPImage = await convertToWebP(e.target.files[0]);
      webPImage
        ? setSelectedImage(webPImage)
        : dispatch(
            setNotification({
              message: "No se pudo comprimir la imagen",
              type: "error",
            })
          );
      setIsImageProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Nombre de la Marca:
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="text-base p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
              placeholder="Nombre de la Marca"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Imagen de la Marca:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-base p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
            />
            {selectedImage && !isImageProcessing && (
              <p className="text-sm mt-2">Archivo seleccionado: {selectedImage.name}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isImageProcessing}
            className="w-full bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide
                        font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            {isSubmitting || isImageProcessing ? <Spinner /> : "Guardar Marca"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrandForm;

