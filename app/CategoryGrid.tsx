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
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      src={imgSrc}
      alt={alt}
      width={400}
      height={280}
      priority
      onError={() => setImgSrc("/pinta-bien.png")}
    />
  );
}

export default function CategoryGrid({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <main>
      <h1 className="font-display text-3xl text-verde mb-8 text-center tracking-tight">
        Nuestras Categorías
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="relative rounded-xl overflow-hidden cursor-pointer group"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              custom={index}
              variants={categoryAnimation}
              className="relative w-full h-44 md:h-56"
            >
              <CategoryImage src={category.imageUrl} alt={category.name} />
              <div className="absolute inset-0 bg-verde/70 group-hover:bg-verde/60 transition-colors duration-300" />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-ambar scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-crema text-center px-3">
                <h2 className="font-display text-xl md:text-2xl group-hover:scale-105 transition-transform duration-300 drop-shadow-sm">
                  {category.name}
                </h2>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </main>
  );
}
