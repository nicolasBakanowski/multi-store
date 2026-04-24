import React, { useState } from "react";
import { FiPackage, FiTruck } from "react-icons/fi";

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
  { value: "pickup", label: "Retirar en el local", icon: FiPackage },
  { value: "delivery", label: "Envío a domicilio", icon: FiTruck },
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
    "mt-1 w-full px-3 py-2.5 bg-white/70 border border-black/10 rounded-xl text-vb-negro text-sm placeholder-vb-negro/40 focus:outline-none focus:border-vb-ambar transition-colors";

  const labelClass =
    "text-xs font-medium text-vb-negro/55 uppercase tracking-wide block mb-1";

  return (
    <div className="bg-vb-crema border border-black/10 rounded-2xl p-5 shadow-card space-y-5">
      <h2 className="font-display text-xl text-vb-negro">Método de entrega</h2>

      <div className="flex gap-3">
        {METHODS.map(({ value, label, icon: Icon }) => (
          <label
            key={value}
            htmlFor={value}
            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
              deliveryMethod === value
                ? "bg-vb-negro text-vb-dorado border-vb-dorado/40 shadow-nav"
                : "bg-white/60 text-vb-negro/70 border-black/10 hover:border-vb-ambar/40"
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
            <Icon size={18} />
            <span>{label}</span>
          </label>
        ))}
      </div>

      {deliveryMethod === "pickup" && (
        <div>
          <label className={labelClass}>Tu nombre</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            placeholder="¿A nombre de quién es el pedido?"
            required
          />
        </div>
      )}

      {/* G — delivery ahora pide nombre también */}
      {deliveryMethod === "delivery" && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Tu nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              placeholder="Nombre completo"
              required
            />
          </div>
          <div>
            <label className={labelClass}>Teléfono</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={inputClass}
              placeholder="Calle, número, piso, depto..."
              required
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;
