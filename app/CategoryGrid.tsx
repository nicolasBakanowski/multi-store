"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { categoryAnimation } from "@/animations/categoryAnimation";

type Category = { id: number; name: string; imageUrl: string };

function CategoryImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 50vw, 33vw"
      priority
      onError={() => setImgSrc("/despacho-placeholder.png")}
    />
  );
}

export default function CategoryGrid({
  categories,
}: {
  categories: Category[];
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, search]);

  return (
    <main>
      {/* Header */}
      <div className="text-center mb-6 pt-1">
        <p className="text-xs text-verde/50 uppercase tracking-[0.2em] font-medium mb-2">
          Nuestro despacho
        </p>
        <h1 className="font-display text-3xl md:text-5xl text-verde tracking-tight">
          ¿Qué buscás?
        </h1>
        <div className="w-10 h-0.5 bg-ambar mx-auto mt-3 rounded-full" />
      </div>

      {/* Buscador de categorías */}
      <div className="relative mb-5">
        <FiSearch
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-carbon/35 pointer-events-none"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar categoría…"
          className="w-full rounded-xl border border-crema-dark bg-white pl-10 pr-10 py-3 text-sm text-carbon placeholder-carbon/30 focus:outline-none focus:border-verde transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-carbon/30 hover:text-carbon transition-colors cursor-pointer"
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="font-display text-xl text-carbon/30 mb-2">
            Sin resultados
          </p>
          <p className="text-sm text-carbon/40 mb-4">
            No encontramos "{search}" entre las categorías.
          </p>
          <button
            onClick={() => setSearch("")}
            className="text-sm text-ambar hover:text-ambar-dark font-medium transition-colors cursor-pointer"
          >
            Ver todas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {filtered.map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group relative block rounded-xl md:rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                custom={index}
                variants={categoryAnimation}
                className="relative w-full aspect-square md:aspect-[4/3]"
              >
                <CategoryImage src={category.imageUrl} alt={category.name} />

                {/* Overlay uniforme — garantiza legibilidad del texto centrado */}
                <div className="absolute inset-0 bg-carbon/40 group-hover:bg-carbon/30 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/50 to-transparent" />

                {/* Acento top en hover */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-ambar scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Nombre centrado */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
                  <h2 className="font-display text-base md:text-xl text-crema leading-tight drop-shadow-md">
                    {category.name}
                  </h2>
                  <div className="h-0.5 w-0 group-hover:w-6 bg-ambar rounded-full transition-all duration-400 mt-2" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
