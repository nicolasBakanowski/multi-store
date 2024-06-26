import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoryAction";
import { RootState } from "../redux/store";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { motion } from 'framer-motion';
import { categoryAnimation } from "@/animations/categoryAnimation";


const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  if (isLoading) {

    return <div className="mt-52"><Spinner /></div>;
  }

  return (
    <div>
      <main className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="rounded-lg overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1 cursor-pointer relative group"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              custom={index}
              variants={categoryAnimation}
              className="w-full h-40"
            >
              <div>
                <Image className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                  src={category.imageUrl}
                  alt={category.name}
                  width={144}
                  height={160}
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-center">
                  <h1 className="font-bold text-2xl group-hover:text-3xl">
                    {category.name}
                  </h1>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default HomePage;
