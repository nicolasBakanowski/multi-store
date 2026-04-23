"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setNotification } from "@/redux/slices/notificationSlice";
import {
  fetchAllProductsForLottery,
  fetchCurrentLottery,
  startLottery,
} from "@/app/actions/lottery";
import Spinner from "./Spinner";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  costPrice: number;
  imageUrl: string;
  available: boolean;
}

interface ActiveLottery {
  id: number;
  targetAmount: number;
  status: string;
}

const LotteryManager = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state: RootState) => state.user.token);

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeLottery, setActiveLottery] = useState<ActiveLottery | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        const [prods, lottery] = await Promise.all([
          fetchAllProductsForLottery(),
          fetchCurrentLottery(),
        ]);
        setProducts(prods.filter((p: Product) => p.available));
        setActiveLottery(lottery);
      } catch {
        dispatch(
          setNotification({ message: "Error al cargar productos.", type: "error" })
        );
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [dispatch]);

  const toggleProduct = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const selectedProducts = products.filter((p) => selectedIds.includes(p.id));
  const totalCost = selectedProducts.reduce((sum, p) => sum + p.costPrice, 0);
  const targetAmount = totalCost * 2;

  const handleLaunch = async () => {
    if (!userToken) {
      dispatch(
        setNotification({ message: "Tenés que iniciar sesión.", type: "error" })
      );
      return;
    }
    if (selectedIds.length === 0) {
      dispatch(
        setNotification({
          message: "Seleccioná al menos un producto.",
          type: "error",
        })
      );
      return;
    }
    try {
      setIsSubmitting(true);
      await startLottery({ productIds: selectedIds, token: userToken });
      const updated = await fetchCurrentLottery();
      setActiveLottery(updated);
      setSelectedIds([]);
      dispatch(
        setNotification({ message: "Sorteo iniciado con éxito.", type: "success" })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          message: error?.message || "Error al iniciar el sorteo.",
          type: "error",
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {activeLottery && (
          <div className="bg-green-50 border border-green-300 rounded-xl p-6">
            <h2 className="text-lg font-bold text-green-800 mb-1">
              Sorteo activo
            </h2>
            <p className="text-green-700">
              Meta de ventas:{" "}
              <span className="font-semibold">
                ${activeLottery.targetAmount.toLocaleString("es-AR")}
              </span>
            </p>
            <p className="text-sm text-green-600 mt-1">
              Los participantes se van acumulando a medida que se confirman
              órdenes de usuarios registrados.
            </p>
          </div>
        )}

        {!activeLottery && (
          <>
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                Elegí los productos del sorteo
              </h2>
              <p className="text-sm text-gray-500">
                Los productos seleccionados son el premio. La meta de ventas se
                calcula como el doble del costo de los productos elegidos.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {products.map((product) => {
                const selected = selectedIds.includes(product.id);
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => toggleProduct(product.id)}
                    className={`relative rounded-xl border-2 p-3 text-left transition-all focus:outline-none
                      ${
                        selected
                          ? "border-green-500 bg-green-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-gray-400"
                      }`}
                  >
                    {selected && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        ✓
                      </span>
                    )}
                    <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={failedImages.has(product.id) ? "/pinta-bien.png" : (product.imageUrl || "/pinta-bien.png")}
                        alt={product.name}
                        fill
                        className="object-cover"
                        onError={() => setFailedImages(prev => new Set(prev).add(product.id))}
                      />
                    </div>
                    <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Costo: ${product.costPrice.toLocaleString("es-AR")}
                    </p>
                  </button>
                );
              })}
            </div>

            {selectedIds.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
                <h3 className="font-bold text-gray-700">Resumen del sorteo</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedProducts.map((p) => (
                    <li key={p.id} className="flex justify-between">
                      <span>{p.name}</span>
                      <span className="text-gray-400">
                        ${p.costPrice.toLocaleString("es-AR")}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-3 flex justify-between text-sm font-semibold text-gray-700">
                  <span>Costo total del premio</span>
                  <span>${totalCost.toLocaleString("es-AR")}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-green-700">
                  <span>Meta de ventas (2× costo)</span>
                  <span>${targetAmount.toLocaleString("es-AR")}</span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleLaunch}
              disabled={isSubmitting || selectedIds.length === 0}
              className="w-full bg-green-500 text-white p-4 rounded-full font-semibold tracking-wide
                hover:bg-green-600 focus:outline-none shadow-lg transition ease-in duration-300
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Spinner /> : "Iniciar sorteo"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LotteryManager;
