"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSocketAuthToken } from "../socket/socketConfig";

export default function ApiAndSocketSync() {
  const token = useSelector((s: RootState) => s.user.token);

  useEffect(() => {
    setSocketAuthToken(token);
  }, [token]);

  return null;
}
