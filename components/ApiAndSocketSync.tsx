import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { configureApiAuth } from "../redux/axios.config";
import { setSocketAuthToken } from "../socket/socketConfig";

/**
 * Mantiene axios (Authorization) y Socket.IO (auth.token) alineados con Redux.
 */
export default function ApiAndSocketSync() {
  const token = useSelector((s: RootState) => s.user.token);

  useEffect(() => {
    configureApiAuth(() => token ?? null);
    setSocketAuthToken(token);
  }, [token]);

  return null;
}
