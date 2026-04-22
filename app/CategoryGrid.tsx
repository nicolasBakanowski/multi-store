"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { categoryAnimation } from "@/animations/categoryAnimation";

type Category = { id: number; name: string; imageUrl: string };

function CategoryImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      className="w-full h-40 object-cover transition-transform group-hover:scale-105"
      src={imgSrc}
      alt={alt}
      width={144}
      height={160}
      priority
      onError={() => setImgSrc("/pinta-bien.png")}
    />
  );
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
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
              <CategoryImage src={category.imageUrl} alt={category.name} />
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
  );
}

