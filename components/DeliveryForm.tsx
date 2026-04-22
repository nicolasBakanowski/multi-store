import React, { useState } from "react";

interface DeliveryFormProps {
  formData: {
    name: string;
    phone: string;
    address: string;
  };
  setFormData: (data: {
    name: string;
    phone: string;
    address: string;
  }) => void;
  onDeliveryMethodChange: (method: string) => void;
}

const METHODS = [
  { value: "pickup", label: "Retirar en el Local" },
  { value: "delivery", label: "Envío a Domicilio" },
];

const DeliveryForm: React.FC<DeliveryFormProps> = ({
  formData,
  setFormData,
  onDeliveryMethodChange,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setDeliveryMethod(selected);
    onDeliveryMethodChange(selected);
    setFormData({ name: "", phone: "", address: "" });
  };

  const inputClass =
    "mt-1 w-full px-3 py-2.5 bg-crema border border-crema-dark rounded-lg text-carbon text-sm placeholder-carbon/30 focus:outline-none focus:border-verde transition-colors";

  const labelClass =
    "text-xs font-medium text-carbon/50 uppercase tracking-wide block mb-1";

  return (
    <div className="bg-white border border-crema-dark rounded-xl p-5 shadow-sm">
      <h2 className="font-display text-xl text-carbon mb-4">
        Método de Entrega
      </h2>

      <div className="flex gap-3 mb-5">
        {METHODS.map(({ value, label }) => (
          <label
            key={value}
            htmlFor={value}
            className={`flex-1 flex items-center justify-center py-2.5 rounded-lg border cursor-pointer text-sm font-medium transition-all ${
              deliveryMethod === value
                ? "bg-verde text-crema border-verde"
                : "bg-crema text-carbon/60 border-crema-dark hover:border-verde/40"
            }`}
          >
            <input
              type="radio"
              id={value}
              name="deliveryMethod"
              value={value}
              checked={deliveryMethod === value}
              onChange={handleChange}
              className="sr-only"
            />
            {label}
          </label>
        ))}
      </div>

      {deliveryMethod === "pickup" && (
        <div>
          <label className={labelClass}>Nombre</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className={inputClass}
            placeholder="Tu nombre"
            required
          />
        </div>
      )}

      {deliveryMethod === "delivery" && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Teléfono</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={inputClass}
              placeholder="+54 9 ..."
              required
            />
          </div>
          <div>
            <label className={labelClass}>Dirección</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className={inputClass}
              placeholder="Calle, número, piso..."
              required
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;
