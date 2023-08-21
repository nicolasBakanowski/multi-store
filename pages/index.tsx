import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoryAction";
import { RootState } from "../redux/store"; // Asegúrate de importar correctamente el RootState.
import Link from "next/link";
import { setCurrentCategory } from "@/redux/slices/categorySlice";
import { Category } from "@/interfaces/Category";
import Image from "next/image";
const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);
  const handleCategoryClick = (category: Category) => {
    dispatch(setCurrentCategory(category)); // Dispara la acción selectCategory al hacer clic
  };
  return (
    <div>
      <main className="container mx-auto mt-10 p-4">
        <h1 className="text-3xl font-semibold mb-4">
          Selecciona una categoria
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              href={`/category/${category.id}`}
              className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1 cursor-pointer"
              style={{ backgroundColor: "#7c0303" }}
            >
              <div className="relative">
                <Image
                  src={"http://localhost:30001/uploads/productorpueba.jpg"}
                  alt={category.name}
                  width={144}
                  height={160}
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="p-4  bg-black">
                <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-300">{"hola"}</p>
              </div>
            </Link>
          ))}
        </div>
        {/* Resto de tu contenido */}
      </main>
    </div>
  );
};

export default HomePage;
