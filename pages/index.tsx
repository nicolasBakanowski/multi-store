// HomePage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoryAction";
import { RootState } from "../redux/store";
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
    dispatch(setCurrentCategory(category));
  };

  return (
    <div>
      <main className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            href={`/category/${category.id}`}
            className="rounded-lg overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1 cursor-pointer relative group"
          >
            <div className="relative">
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={144}
                height={160}
                className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-center">
              <h1 className="font-bold text-2xl group-hover:text-3xl">
                {category.name}
              </h1>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default HomePage;
