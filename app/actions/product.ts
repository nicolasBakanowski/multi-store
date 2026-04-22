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

export async function fetchProductsByCategory(categoryId: number) {
  const res = await fetch(`${apiBaseUrl()}/product/category/${categoryId}`, {
    cache: "no-store",
  });
  return await jsonOrThrow<any>(res);
}

export async function fetchProductById(productId: number) {
  const res = await fetch(`${apiBaseUrl()}/product/${productId}`, {
    cache: "no-store",
  });
  return await jsonOrThrow<any>(res);
}

export async function addProduct(params: { productData: FormData; token: string }) {
  const res = await fetch(`${apiBaseUrl()}/product/new`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${params.token}`,
    },
    body: params.productData,
    cache: "no-store",
  });
  return await jsonOrThrow<any>(res);
}

export async function editProduct(params: {
  idProduct: number;
  productData: FormData;
  token: string;
}) {
  const res = await fetch(`${apiBaseUrl()}/product/edit/${params.idProduct}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${params.token}`,
    },
    body: params.productData,
    cache: "no-store",
  });
  return await jsonOrThrow<any>(res);
}

export async function disableProduct(params: {
  idProduct: number;
  token: string;
  active?: boolean;
}) {
  const res = await fetch(`${apiBaseUrl()}/product/status/${params.idProduct}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify({ active: params.active ?? false }),
    cache: "no-store",
  });
  return await jsonOrThrow<any>(res);
}

