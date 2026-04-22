"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { productAnimation } from "@/animations/productAnimation";
import ProductCard from "@/components/ProductCard";
import ProductEditModal from "@/components/ProductEditModal";
import Notification from "@/components/Notification";
import { RootState } from "@/redux/store";
import { editProduct } from "@/app/actions/product";
import type { Product } from "@/interfaces/Products";

export default function CategoryProductsClient({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const userToken = useSelector((s: RootState) => s.user.token);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editModalStates, setEditModalStates] = useState<Record<number, boolean>>(
    {}
  );

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

