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

export async function createOrder(params: {
  simplifiedCartItems: { productId: number; quantity: number }[];
  userInfo: { name: string; phone: string; address: string };
  deliveryMethod: string;
  totalAmount: number;
  totalCostPrice: number;
}) {
  const res = await fetch(`${apiBaseUrl()}/order/new`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(params),
    cache: "no-store",
  });
  return await jsonOrThrow<any>(res);
}

export async function changeOrderStatus(params: {
  orderId: number;
  statusId: number;
  token: string;
}) {
  const res = await fetch(`${apiBaseUrl()}/order/${params.orderId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify({ statusId: params.statusId }),
    cache: "no-store",
  });
  return await jsonOrThrow<any>(res);
}

