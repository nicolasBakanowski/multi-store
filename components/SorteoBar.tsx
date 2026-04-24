"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchCurrentLottery } from "@/app/actions/lottery";
import socket from "@/socket/socketConfig";
import LotteryPublicModal from "@/components/LotteryPublicModal";

type LotteryBarState = {
  id: number;
  targetAmount: number;
  collectedAmount: number;
} | null;

type LotteryProgressEvent = {
  lotteryId: number;
  targetAmount: number;
  collectedAmount: number;
};

export default function SorteoBar() {
  const [lottery, setLottery] = useState<LotteryBarState | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  const load = useCallback(async () => {
    const data = await fetchCurrentLottery();
    if (data) {
      setLottery({
        id: data.id,
        targetAmount: Number(data.targetAmount),
        collectedAmount: Number(data.collectedAmount ?? 0),
      });
    } else {
      setLottery(null);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onProgress = (p: LotteryProgressEvent) => {
      setLottery({
        id: p.lotteryId,
        targetAmount: Number(p.targetAmount),
        collectedAmount: Number(p.collectedAmount),
      });
    };
    socket.on("lotteryProgressUpdated", onProgress);
    return () => {
      socket.off("lotteryProgressUpdated", onProgress);
    };
  }, []);

  const formatPrice = (n: number) =>
    `$${Math.round(n).toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;

  if (lottery === undefined) {
    return (
      <div
        className="fixed top-16 left-0 right-0 z-40 h-12 flex items-center bg-vb-negro border-b border-vb-dorado/15 px-4"
        aria-hidden
      />
    );
  }

  if (lottery === null) {
    return (
      <div className="fixed top-16 left-0 right-0 z-40 h-12 flex items-center bg-vb-negro border-b border-vb-dorado/15 px-4">
        <div className="container mx-auto flex items-center gap-3">
          <span className="text-vb-ambar text-xs font-semibold shrink-0 tracking-wide">
            SORTEO
          </span>
          <span className="text-vb-crema/60 text-xs">No hay un sorteo activo</span>
        </div>
      </div>
    );
  }

  const target = Math.max(0.0001, Number(lottery.targetAmount));
  const collected = Math.max(0, Number(lottery.collectedAmount));
  const pct = Math.min(100, (collected / target) * 100);
  const falta = Math.max(0, target - collected);
  const completado = collected >= target;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-12 flex items-center bg-vb-negro border-b border-vb-dorado/15 px-4">
      <div className="container mx-auto flex items-center gap-3 min-w-0">
        <span className="text-vb-ambar text-xs font-semibold shrink-0 tracking-wide">
          SORTEO
        </span>
        <div className="flex-1 h-1 min-w-0 bg-vb-crema/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-vb-ambar rounded-full transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-vb-crema/80 text-xs shrink-0 tabular-nums text-right max-w-[min(12rem,45vw)]">
          {completado ? (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-vb-ambar font-semibold hover:text-vb-dorado transition-colors focus:outline-none focus:ring-2 focus:ring-vb-ambar/40 rounded px-1 py-0.5"
            >
              Meta alcanzada · ver sorteo
            </button>
          ) : (
            <span>
              {formatPrice(collected)} / {formatPrice(target)} · faltan{" "}
              {formatPrice(falta)}
            </span>
          )}
        </span>
      </div>
      <LotteryPublicModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
