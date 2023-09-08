import React, { useState } from "react";

interface DeliveryFormProps {
  formData: {
    name: string;
    phoneNumber: string;
    address: string;
  };
  setFormData: (formData: {
    name: string;
    phoneNumber: string;
    address: string;
  }) => void;
  onDeliveryMethodChange: (method: string) => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({
  formData,
  setFormData,
  onDeliveryMethodChange,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");

  const handleDeliveryMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedMethod = event.target.value;
    setDeliveryMethod(selectedMethod);
    onDeliveryMethodChange(selectedMethod);

    // Reset formData when the delivery method changes
    setFormData({
      name: "",
      phoneNumber: "",
      address: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-4">Método de Entrega</h2>
      <div className="flex items-center mb-4">
        <input
          type="radio"
          id="pickup"
          name="deliveryMethod"
          value="pickup"
          checked={deliveryMethod === "pickup"}
          onChange={handleDeliveryMethodChange}
          className="mr-2"
        />
        <label htmlFor="pickup" className="text-sm font-medium text-gray-700">
          Retirar en el Local
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          id="delivery"
          name="deliveryMethod"
          value="delivery"
          checked={deliveryMethod === "delivery"}
          onChange={handleDeliveryMethodChange}
          className="mr-2"
        />
        <label htmlFor="delivery" className="text-sm font-medium text-gray-700">
          Envío a Domicilio
        </label>
      </div>

      {/* Mostrar campos adicionales según el método de entrega */}
      {deliveryMethod === "pickup" && (
        <div className="mb-4">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
      )}
      {deliveryMethod === "delivery" && (
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-gray-700"
            >
              Celular:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Dirección:
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;
