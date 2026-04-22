"use server";

function apiBaseUrl(): string {
  return process.env.API_URL || "http://localhost:30001";
}

async function jsonOrThrow<T>(res: Response): Promise<T> {
  if (res.ok) return (await res.json()) as T;
  let msg = `HTTP ${res.status}`;
  try {
    const data = (await res.json()) as { error?: string; message?: string };
    msg = data?.error || data?.message || msg;
  } catch {
    // ignore
  }
  throw new Error(msg);
}

export async function addCategory(params: { categoryData: FormData; token: string }) {
  const res = await fetch(`${apiBaseUrl()}/category/new`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${params.token}`,
    },
    body: params.categoryData,
    cache: "no-store",
  });
  return await jsonOrThrow<any>(res);
}

export async function fetchAllCategories() {
  const res = await fetch(`${apiBaseUrl()}/category/all`, { cache: "no-store" });
  return await jsonOrThrow<any>(res);
}

