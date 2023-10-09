import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ProductCard from "../../components/ProductCard";
import { fetchProductsByCategory } from "@/redux/actions/productAction";
import { Product } from "@/interfaces/Products";
import ProductEditModal from "@/components/ProductEditModal";

const CategoryPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    (state: RootState) => state.category.currentCategory
  );
  const products = useSelector((state: RootState) => state.product.products);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Agrega el estado para el modal

  useEffect(() => {
    if (currentCategory) {
      dispatch(fetchProductsByCategory(currentCategory.id) as any);
    }
  }, [currentCategory, dispatch]);
  const handleEditClick = (product: Product) => {
    setIsEditModalOpen(true);
  };
  const handlerOnSave = (formData: FormData) => {
    console.log("Guardar producto:", formData);
  };
  return (
    <div>
      <main className="container mx-auto mr-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: Product) => (
            <div className="items-center">
              <ProductCard
                key={product.id}
                product={product}
                onEditClick={handleEditClick}
              />
              {isEditModalOpen && (
                <ProductEditModal
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  product={product}
                  onSave={handlerOnSave}
                  onHide={() => setIsEditModalOpen(false)}
                />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
