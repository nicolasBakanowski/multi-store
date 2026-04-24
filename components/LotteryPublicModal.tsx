"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchCurrentLotteryPublic } from "@/app/actions/lottery";
import socket from "@/socket/socketConfig";

type Participant = {
  userId: number;
  displayName: string;
  orders: number;
  amount: number;
};

type PublicPayload = {
  lottery: {
    id: number;
    targetAmount: number;
    collectedAmount: number;
    winnerId?: number | null;
    status?: string;
  };
  participants: Participant[];
  winner: { userId: number; displayName: string } | null;
};

export default function LotteryPublicModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [data, setData] = useState<PublicPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchCurrentLotteryPublic();
      setData(res);
    } catch (e: any) {
      setError(e?.message || "No se pudo cargar el sorteo");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    void load();
  }, [open, load]);

  useEffect(() => {
    if (!open) return;
    const onPublicUpdated = (payload: any) => {
      setData(payload as PublicPayload);
    };
    socket.on("lotteryPublicUpdated", onPublicUpdated);
    return () => {
      socket.off("lotteryPublicUpdated", onPublicUpdated);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const fmt = (n: number) =>
    `$${Math.round(n).toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;

  const header = useMemo(() => {
    if (!data?.lottery) return null;
    const target = Math.max(0.0001, Number(data.lottery.targetAmount));
    const collected = Math.max(0, Number(data.lottery.collectedAmount));
    const pct = Math.min(100, (collected / target) * 100);
    return { target, collected, pct };
  }, [data]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-3"
      role="dialog"
      aria-modal="true"
      aria-label="Sorteo"
    >
      <button
        className="absolute inset-0 bg-vb-negro/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Cerrar"
      />

      <div className="relative w-full max-w-2xl rounded-2xl border border-vb-dorado/15 bg-vb-negro text-vb-crema shadow-2xl">
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-vb-dorado/10">
          <div className="min-w-0">
            <p className="text-vb-ambar text-xs font-semibold tracking-wide">
              SORTEO
            </p>
            <h2 className="font-display text-lg leading-tight">
              Participantes y ganador
            </h2>
            {header && (
              <p className="text-xs text-vb-crema/75 mt-1 tabular-nums">
                {fmt(header.collected)} / {fmt(header.target)} ·{" "}
                {header.pct.toFixed(0)}%
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full border border-vb-dorado/20 bg-vb-negro px-3 py-2 text-xs text-vb-crema/85 hover:text-vb-crema hover:border-vb-dorado/50 transition-colors focus:outline-none focus:ring-2 focus:ring-vb-ambar/40"
          >
            Cerrar
          </button>
        </div>

        <div className="px-5 py-4">
          {loading && (
            <div className="text-sm text-vb-crema/75">Cargando…</div>
          )}
          {!loading && error && (
            <div className="text-sm text-vb-rojo">{error}</div>
          )}

          {!loading && !error && data && (
            <div className="space-y-4">
              <div className="rounded-xl border border-vb-dorado/15 bg-vb-crema/5 p-4">
                {data.winner ? (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-vb-crema/75">Ganador</p>
                      <p className="text-vb-ambar font-semibold text-base">
                        {data.winner.displayName}
                      </p>
                    </div>
                    <span className="text-xs text-vb-crema/65">
                      Resultado oficial
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-vb-crema/75">Ganador</p>
                      <p className="text-vb-crema font-semibold text-base">
                        A sortear
                      </p>
                    </div>
                    <span className="text-xs text-vb-crema/65">
                      Meta alcanzada: sorteo pendiente
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-vb-crema">
                  Participantes
                </p>
                <p className="text-xs text-vb-crema/65 tabular-nums">
                  {data.participants.length} registrados
                </p>
              </div>

              {data.participants.length === 0 ? (
                <p className="text-sm text-vb-crema/75">
                  Aún no hay participantes.
                </p>
              ) : (
                <div className="max-h-[50vh] overflow-auto rounded-xl border border-vb-dorado/15">
                  <ul className="divide-y divide-vb-dorado/10">
                    {data.participants.map((p) => (
                      <li
                        key={p.userId}
                        className="flex items-center justify-between gap-3 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm text-vb-crema truncate">
                            {p.displayName}
                          </p>
                          <p className="text-xs text-vb-crema/65 tabular-nums">
                            {p.orders} pedido{p.orders === 1 ? "" : "s"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-vb-crema/65">Aporte</p>
                          <p className="text-sm text-vb-crema tabular-nums">
                            {fmt(p.amount)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-[11px] leading-relaxed text-vb-crema/60">
                Los nombres se muestran abreviados para cuidar la privacidad.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

