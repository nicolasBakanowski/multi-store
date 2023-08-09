import React from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";
const CategoryPage = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  // Simulamos productos de ejemplo
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 9.99,
      image: "/images/product1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Pellentesque nec metus et ex tristique efficitur.",
      price: 14.99,
      image: "/images/product2.jpg",
    },
    // Agrega más productos aquí
  ];

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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
