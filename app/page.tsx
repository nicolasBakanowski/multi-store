import CategoryGrid from "./CategoryGrid";

type Category = { id: number; name: string; imageUrl: string };

function apiBaseUrl(): string {
  return process.env.API_URL || "http://localhost:30001";
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${apiBaseUrl()}/category/all`, { cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()) as Category[];
}

export default async function HomePage() {
  const categories = await getCategories();
  return (
    <div>
      <CategoryGrid categories={categories} />
    </div>
  );
}

