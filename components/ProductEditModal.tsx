import React, { useState, ChangeEvent } from "react";
import { MdClose } from "react-icons/md";

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    description: string;
    stock: number;
    price: number;
  };
  onSave: (formData: FormData) => void;
  onHide: () => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave,
  onHide,
}) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    stock: product.stock,
    price: product.price,
  });

  const [isActive, setIsActive] = useState(true);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white p-4 rounded shadow-lg z-50">
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
            />
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
          <div className="flex items-center ml-4">
            <input
              type="checkbox"
              id="isActive"
              className="hidden"
              checked={isActive}
              onChange={toggleActive}
            />
            <label
              htmlFor="isActive"
              className={`relative w-12 h-6 rounded-full ${
                isActive ? "bg-green-600" : "bg-red-600"
              } cursor-pointer transition duration-300`}
            >
              <span
                className={`absolute w-6 h-6 rounded-full bg-white border-2 border-gray-300 transform transition-transform ${
                  isActive ? "translate-x-6" : ""
                }`}
              ></span>
            </label>
            <label htmlFor="isActive" className="ml-2 max-w-max">
              {isActive ? "Activado" : "Desactivado"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditModal;
