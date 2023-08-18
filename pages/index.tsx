import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoryAction";
import { RootState } from "../redux/store"; // Asegúrate de importar correctamente el RootState.
import Link from "next/link";
import { setCurrentCategory } from "@/redux/slices/categorySlice";
import { Category } from "@/interfaces/Category";

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
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              href={`/category/${category.id}`} // Ajusta la ruta según tu estructura de URL
              className="border rounded-md p-3 text-center hover:bg-black block"
            >
              {category.name}
            </Link>
          ))}
        </div>
        {/* Resto de tu contenido */}
      </main>
    </div>
  );
};

export default HomePage;
