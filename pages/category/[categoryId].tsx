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
  const handleGoBack = () => {
    router.back();
  };
  useEffect(() => {
    if (currentCategory) {
      dispatch(fetchProductsByCategory(currentCategory.id) as any);
    }
  }, [currentCategory, dispatch]);
  console.log("estos deberian ser los productos en el ", products);

  return (
    <div>
      <main className="container mx-auto mt-10 p-4">
        <div className="mb-4">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al Inicio
          </button>
        </div>
        <h1 className="text-3xl font-semibold mb-4">Category Name</h1>
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
