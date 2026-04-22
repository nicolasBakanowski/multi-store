import { cookies } from "next/headers";
import OrdersClient from "./OrdersClient";

function apiBaseUrl(): string {
  return process.env.API_URL || "http://localhost:30001";
}

export default async function OrdersPage() {
  const token = cookies().get("token")?.value;
  const headers: Record<string, string> = {};
  if (token) headers.authorization = `Bearer ${token}`;

  const [statusRes, ordersRes] = await Promise.all([
    fetch(`${apiBaseUrl()}/status`, { cache: "no-store" }),
    fetch(`${apiBaseUrl()}/order/`, { cache: "no-store", headers }),
  ]);

  const status = statusRes.ok ? await statusRes.json() : [];
  const ordersRaw = ordersRes.ok ? await ordersRes.json() : [];

  return <OrdersClient initialOrdersRaw={ordersRaw} initialStatus={status} />;
}

