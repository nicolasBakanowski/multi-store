"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const SORTEO_THRESHOLD = 15000;

export default function SorteoBar() {
  const cart = useSelector((state: RootState) => state.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const participaciones = Math.floor(total / SORTEO_THRESHOLD);
  const progreso = total === 0 ? 0 : (total % SORTEO_THRESHOLD) / SORTEO_THRESHOLD;
  const falta = SORTEO_THRESHOLD - (total % SORTEO_THRESHOLD);

  const formatPrice = (n: number) =>
    `$${Math.round(n).toLocaleString("es-AR")}`;

  return (
    <div className="bg-verde-dark border-b border-verde-light/30 px-4 py-2">
      <div className="container mx-auto flex items-center gap-3">
        <span className="text-ambar text-xs font-semibold shrink-0 tracking-wide">
          SORTEO
        </span>
        <div className="flex-1 h-1 bg-verde-light/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-ambar rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.min(progreso * 100, 100)}%` }}
          />
        </div>
        <span className="text-crema/70 text-xs shrink-0 tabular-nums">
          {total === 0 ? (
            <span className="text-crema/40">Comprá para sumar participaciones</span>
          ) : falta === 0 || total % SORTEO_THRESHOLD === 0 ? (
            <span className="text-ambar font-semibold">
              {participaciones} participación{participaciones !== 1 ? "es" : ""} ✓
            </span>
          ) : (
            <span>
              {participaciones > 0 && (
                <span className="text-ambar font-semibold mr-1">
                  {participaciones} part. ·{" "}
                </span>
              )}
              gastá {formatPrice(falta)} más y sumás {participaciones > 0 ? "otra" : "una"}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
