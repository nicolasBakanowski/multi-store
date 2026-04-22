"use client";

import { ReactNode } from "react";

/**
 * Mantiene el socket como concern client-side.
 * Hoy la sincronización de auth/token vive en `components/ApiAndSocketSync`.
 */
export default function SocketProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

