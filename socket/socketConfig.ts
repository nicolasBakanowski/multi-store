import { io, Socket } from "socket.io-client";

const socketURL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:30001";

let socket: Socket | null = null;

function applyAuth(s: Socket, token: string | null | undefined) {
  (s.auth as { token?: string }) = {
    token: token || undefined,
  };
}

function getOrCreateSocket(token?: string | null): Socket {
  if (!socket) {
    socket = io(socketURL, {
      auth: { token: token || undefined },
    });
    return socket;
  }

  const next = token || undefined;
  const current = (socket.auth as { token?: string })?.token;
  if (current !== next) {
    applyAuth(socket, token ?? null);
    socket.disconnect();
    socket.connect();
  }
  return socket;
}

/** Llamar cuando cambie el JWT (p. ej. login / logout). */
export function setSocketAuthToken(token: string | null): Socket {
  return getOrCreateSocket(token);
}

const defaultSocket = getOrCreateSocket(null);
export default defaultSocket;
