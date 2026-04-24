"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateProductStocks } from "../redux/slices/productSlice";
import socket, { setSocketAuthToken } from "../socket/socketConfig";

type StockEventRow = { productId: number; stock: number };

export default function ApiAndSocketSync() {
  const dispatch = useDispatch();
  const token = useSelector((s: RootState) => s.user.token);

  useEffect(() => {
    setSocketAuthToken(token);
  }, [token]);

  useEffect(() => {
    const onStocks = (rows: StockEventRow[]) => {
      if (!Array.isArray(rows) || rows.length === 0) return;
      dispatch(
        updateProductStocks(
          rows.map((r) => ({ id: r.productId, stock: r.stock }))
        )
      );
    };
    socket.on("productStocksUpdated", onStocks);
    return () => {
      socket.off("productStocksUpdated", onStocks);
    };
  }, [dispatch]);

  return null;
}
