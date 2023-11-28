// socketConfig.ts

import { io, Socket } from "socket.io-client";

// Configura la URL del servidor Socket.IO
const socketURL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://18.218.116.205/";

// Crea e inicializa la instancia de Socket.IO
const socket: Socket = io(socketURL);

export default socket;
