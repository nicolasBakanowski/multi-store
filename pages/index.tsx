import React from "react";

const Index = () => {
  const categories = [
    { id: 1, name: "categoria 1" },
    { id: 2, name: "categoria 2" },
    { id: 3, name: "categoria 3 " },
  ];

  return (
    <div>
      <main className="container mx-auto mt-10 p-4">
        <h1 className="text-3xl font-semibold mb-4">
          Selecciona una categoria
        </h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/category/${category.id}`} // Ajusta la ruta según tu estructura de URL
              className="border rounded-md p-3 text-center hover:bg-black block"
            >
              {category.name}
            </a>
          ))}
        </div>
        {/* Resto de tu contenido */}
      </main>
    </div>
  );
};

export default Index;
