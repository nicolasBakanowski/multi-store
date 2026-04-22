"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

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
  const [editModalStates, setEditModalStates] = useState<Record<number, boolean>>(
    {}
  );

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setBrandId(initialBrandId);
  }, [initialBrandId]);

  const productsById = useMemo(() => {
    const m = new Map<number, Product>();
    for (const p of products) m.set(p.id, p);
    return m;
  }, [products]);

  const handleSave = async (idProduct: number, formData: FormData) => {
    if (!userToken) return;
    const updated = await editProduct({ idProduct, productData: formData, token: userToken });
    // backend devuelve el producto actualizado; si no, mantenemos el actual
    const next = updated?.id ? updated : productsById.get(idProduct);
    if (!next) return;
    setProducts((prev) => prev.map((p) => (p.id === idProduct ? next : p)));
  };

  return (
    <div>
      <main className="container mx-auto mr-5">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-end mb-5">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Buscar</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o descripción…"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
          <div className="min-w-[220px]">
            <label className="block text-sm font-medium mb-1">Marca</label>
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="">Todas</option>
              {brands.map((b) => (
                <option key={b.id} value={String(b.id)}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                const qs = new URLSearchParams();
                if (query.trim()) qs.set("q", query.trim());
                if (brandId) qs.set("brandId", brandId);
                const url = qs.toString() ? `${pathname}?${qs.toString()}` : pathname;
                router.replace(url);
              }}
              className="rounded-lg bg-verde text-white px-4 py-2 font-medium"
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: Product) => (
            <motion.div
              key={product.id}
              initial="hidden"
              animate="visible"
              variants={productAnimation}
              className="items-center"
            >
              <div className="items-center" key={product.id}>
                <ProductCard
                  product={product}
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
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Notification />
    </div>
  );
}

