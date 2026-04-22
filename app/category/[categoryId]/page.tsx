import CategoryProductsClient from "./CategoryProductsClient";

function apiBaseUrl(): string {
  return process.env.API_URL || "http://localhost:30001";
}

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const res = await fetch(`${apiBaseUrl()}/product/category/${params.categoryId}`, {
    cache: "no-store",
  });
  const products = res.ok ? await res.json() : [];

  return <CategoryProductsClient initialProducts={products} />;
}

