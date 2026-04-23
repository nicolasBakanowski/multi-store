"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

import { productAnimation } from "@/animations/productAnimation";
import ProductCard from "@/components/ProductCard";
import ProductEditModal from "@/components/ProductEditModal";
import Notification from "@/components/Notification";
import { RootState } from "@/redux/store";
import { editProduct } from "@/app/actions/product";
import type { Product } from "@/interfaces/Products";
import type { Brand } from "@/app/actions/brand";

export default function CategoryProductsClient({
  initialProducts,
  brands,
  initialQuery,
  initialBrandId,
}: {
  initialProducts: Product[];
  brands: Brand[];
  initialQuery: string;
  initialBrandId: string;
}) {
  const userToken = useSelector((s: RootState) => s.user.token);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState(initialQuery);
  const [brandId, setBrandId] = useState(initialBrandId);
  const [editModalStates, setEditModalStates] = useState<Record<number, boolean>>({});

  const brandMap = useMemo(() => {
    const m: Record<number, string> = {};
    for (const b of brands) m[b.id] = b.name;
    return m;
  }, [brands]);

  useEffect(() => { setProducts(initialProducts); }, [initialProducts]);

  // Filtrado 100% client-side — instantáneo, sin servidor
  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false);
      const matchesBrand = !brandId || String(p.brandId) === brandId;
      return matchesQuery && matchesBrand;
    });
  }, [products, query, brandId]);

  const productsById = useMemo(() => {
    const m = new Map<number, Product>();
    for (const p of products) m.set(p.id, p);
    return m;
  }, [products]);

  const handleSave = async (idProduct: number, formData: FormData) => {
    if (!userToken) return;
    const updated = await editProduct({ idProduct, productData: formData, token: userToken });
    const next = updated?.id ? updated : productsById.get(idProduct);
    if (!next) return;
    setProducts((prev) => prev.map((p) => (p.id === idProduct ? next : p)));
  };

  return (
    <div>
      <main>
        {/* Filtros real-time */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
          <div className="flex-1 relative">
            <FiSearch
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-carbon/35 pointer-events-none"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar producto…"
              className="w-full rounded-xl border border-crema-dark bg-white pl-10 pr-9 py-3 text-sm text-carbon placeholder-carbon/30 focus:outline-none focus:border-verde transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-carbon/30 hover:text-carbon transition-colors cursor-pointer"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          {brands.length > 0 && (
            <div className="sm:w-44">
              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-full rounded-xl border border-crema-dark bg-white px-3 py-3 text-sm text-carbon focus:outline-none focus:border-verde transition-colors cursor-pointer"
              >
                <option value="">Todas las marcas</option>
                {brands.map((b) => (
                  <option key={b.id} value={String(b.id)}>{b.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Contador de resultados */}
        {(query || brandId) && (
          <p className="text-xs text-carbon/40 mb-4 tabular-nums">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "resultado" : "resultados"}
            {query && <span> para "<span className="text-carbon/60">{query}</span>"</span>}
          </p>
        )}

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-display text-xl text-carbon/30 mb-2">Sin resultados</p>
            <p className="text-sm text-carbon/40 mb-5">
              {query
                ? `No encontramos "${query}" en esta categoría.`
                : "Esta categoría no tiene productos disponibles."}
            </p>
            {(query || brandId) && (
              <button
                onClick={() => { setQuery(""); setBrandId(""); }}
                className="text-sm text-ambar hover:text-ambar-dark font-medium transition-colors cursor-pointer"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {filteredProducts.map((product: Product) => (
              <motion.div
                key={product.id}
                initial="hidden"
                animate="visible"
                variants={productAnimation}
              >
                <ProductCard
                  product={product}
                  brandName={product.brandId ? brandMap[product.brandId] : undefined}
                  onEditClick={() =>
                    setEditModalStates((p) => ({ ...p, [product.id]: true }))
                  }
                />
                {editModalStates[product.id] && (
                  <ProductEditModal
                    isOpen={editModalStates[product.id]}
                    onClose={() =>
                      setEditModalStates((p) => ({ ...p, [product.id]: false }))
                    }
                    product={product}
                    onSave={(fd) => handleSave(product.id, fd)}
                    onHide={() =>
                      setEditModalStates((p) => ({ ...p, [product.id]: false }))
                    }
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Notification />
    </div>
  );
}
