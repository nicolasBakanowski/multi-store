import React, { useState } from "react";

interface DeliveryFormProps {
  formData: {
    name: string;
    phone: string;
    address: string;
  };
  setFormData: (formData: {
    name: string;
    phone: string;
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
      phone: "",
      address: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-4">Método de Entrega</h2>
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <input
            type="radio"
            id="pickup"
            name="deliveryMethod"
            value="pickup"
            checked={deliveryMethod === "pickup"}
            onChange={handleDeliveryMethodChange}
            className="hidden"
          />
          <label
            htmlFor="pickup"
            className={`cursor-pointer text-sm font-medium ${
              deliveryMethod === "pickup"
                ? "bg-green-500 text-white rounded-full px-4 py-2"
                : "bg-gray-300 text-gray-700 rounded-full px-4 py-2"
            }`}
          >
            Retirar en el Local
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="delivery"
            name="deliveryMethod"
            value="delivery"
            checked={deliveryMethod === "delivery"}
            onChange={handleDeliveryMethodChange}
            className="hidden"
          />
          <label
            htmlFor="delivery"
            className={`cursor-pointer text-sm font-medium ${
              deliveryMethod === "delivery"
                ? "bg-green-500 text-white rounded-full px-4 py-2"
                : "bg-gray-300 text-gray-700 rounded-full px-4 py-2"
            }`}
          >
            Envío a Domicilio
          </label>
        </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Teléfono:
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
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
                <input
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
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;
