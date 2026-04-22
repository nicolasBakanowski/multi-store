import ProductDetail from "./ProductDetail";

function apiBaseUrl(): string {
  return process.env.API_URL || "http://localhost:30001";
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const res = await fetch(`${apiBaseUrl()}/product/${params.productId}`, {
    cache: "no-store",
  });

  if (!res.ok) return <div>No hay producto...</div>;

  const product = await res.json();
  return <ProductDetail product={product} />;
}

