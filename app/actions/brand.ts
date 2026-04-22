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

export type Brand = { id: number; name: string; imageUrl: string };

export async function fetchAllBrands(): Promise<Brand[]> {
  const res = await fetch(`${apiBaseUrl()}/brand/all`, { cache: "no-store" });
  return await jsonOrThrow<Brand[]>(res);
}

export async function addBrand(params: { brandData: FormData; token: string }) {
  const res = await fetch(`${apiBaseUrl()}/brand/new`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${params.token}`,
    },
    body: params.brandData,
    cache: "no-store",
  });
  return await jsonOrThrow<any>(res);
}

