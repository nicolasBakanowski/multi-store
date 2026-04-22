import CategoryProductsClient from "./CategoryProductsClient";
import { fetchAllBrands } from "@/app/actions/brand";

function apiBaseUrl(): string {
  return process.env.API_URL || "http://localhost:30001";
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { categoryId: string };
  searchParams?: { q?: string; brandId?: string };
}) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const brandId =
    typeof searchParams?.brandId === "string" ? searchParams.brandId : "";

  const qs = new URLSearchParams();
  qs.set("categoryId", params.categoryId);
  if (q) qs.set("q", q);
  if (brandId) qs.set("brandId", brandId);

  const res = await fetch(`${apiBaseUrl()}/product/search?${qs.toString()}`, {
    cache: "no-store",
  });
  const products = res.ok ? await res.json() : [];
  const brands = await fetchAllBrands().catch(() => []);
  const brandIdsInResults = new Set<number>(
    (products as Array<{ brandId?: number }>).flatMap((p) =>
      typeof p.brandId === "number" ? [p.brandId] : []
    )
  );
  const filteredBrands =
    brandIdsInResults.size > 0
      ? brands.filter((b) => brandIdsInResults.has(b.id))
      : [];

  return (
    <CategoryProductsClient
      initialProducts={products}
      brands={filteredBrands}
      initialQuery={q}
      initialBrandId={brandId}
    />
  );
}

