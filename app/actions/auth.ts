"use server";

import { cookies } from "next/headers";

type LoginInput = { email: string; password: string };
type RegisterInput = { name: string; email: string; password: string; phone: string };

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

export async function loginAction(input: LoginInput) {
  const res = await fetch(`${apiBaseUrl()}/user/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  const data = await jsonOrThrow<{ user: any; token: string }>(res);

  cookies().set("token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return data;
}

export async function registerAction(input: RegisterInput) {
  const res = await fetch(`${apiBaseUrl()}/user/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  // backend puede devolver user o solo status
  return await jsonOrThrow<any>(res);
}

