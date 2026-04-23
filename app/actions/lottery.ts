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

export async function fetchAllProductsForLottery() {
  const res = await fetch(`${apiBaseUrl()}/product/all`, { cache: "no-store" });
  return await jsonOrThrow<any[]>(res);
}

export async function fetchCurrentLottery() {
  const res = await fetch(`${apiBaseUrl()}/lottery/current`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  return await jsonOrThrow<any>(res);
}

export async function startLottery(params: {
  productIds: number[];
  token: string;
}) {
  const res = await fetch(`${apiBaseUrl()}/lottery/start`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify({ productIds: params.productIds }),
    cache: "no-store",
  });
  return await jsonOrThrow<{ message: string; lottery: number }>(res);
}
