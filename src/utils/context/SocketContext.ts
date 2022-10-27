import { io } from 'socket.io-client';
import { createContext } from 'react';

export const socket = io(process.env.REACT_APP_WS_URL!, {
  withCredentials: true,
  path: '/ws',
});

export const SocketContext = createContext(socket);
