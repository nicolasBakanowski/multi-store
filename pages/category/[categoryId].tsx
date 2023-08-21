import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Asegúrate de importar correctamente el RootState.
import ProductCard from "../../components/ProductCard";
import { fetchProductsByCategory } from "@/redux/actions/productAction";
import { Product } from "@/interfaces/Products";

const CategoryPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    (state: RootState) => state.category.currentCategory
  );
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    if (currentCategory) {
      dispatch(fetchProductsByCategory(currentCategory.id) as any);
    }
  }, [currentCategory, dispatch]);
  return (
    <div>
      <main className="container mx-auto mt-10 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
