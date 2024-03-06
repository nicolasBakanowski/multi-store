import React, { useState, ChangeEvent, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { ProductEditModalProps, ProductEdit } from "@/interfaces/Products";

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave,
  onHide,
}) => {
  const [formData, setFormData] = useState<ProductEdit>({
    name: product.name,
    description: product.description,
    stock: product.stock,
    price: product.price,
  });

  const [isActive, setIsActive] = useState(true);
  const [charCount, setCharCount] = useState(0);
  
  const toggleActive = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    setCharCount(formData.name.length);
  }, [formData.name]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'name') {
      setCharCount(value.length);
    }
  };
  

  const handleSaveClick = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("stock", formData.stock.toString());
    formDataToSend.append("price", formData.price.toString());
    onSave(formDataToSend);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isActive ? "z-50" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className={`modal-container bg-white p-4 rounded shadow-lg ${
          isActive ? "z-50 active-modal" : "z-0 inactive-modal"
        }`}
      >
        <div className="modal-header flex justify-between items-center">
          <h2 className="text-xl font-semibold">Editar Producto</h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition duration-300"
            onClick={onClose}
          >
            <MdClose size={24} />
          </button>
        </div>
        <div className={`modal-body ${isActive ? "" : "opacity-50"}`}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              maxLength={40}
            />
          <p className="text-sm text-gray-500">{`${charCount}/40 caracteres`}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              className="mt-1 p-2 w-full border rounded-md"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="number"
              name="stock"
              value={formData.stock.toString()}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="number"
              step="0.01"
              name="price"
              value={formData.price.toString()}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="modal-footer mt-4 flex justify-end">
          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ${
              isActive ? "" : "pointer-events-none"
            }`}
            onClick={handleSaveClick}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEditModal;
