import { io } from "socket.io-client";
import type { Chat } from "@/models/Chat";

export class ChatService {
  socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
  }

  createChat(chat: Chat) {
    this.socket.emit("createChat", chat);
  }

  listenToRoom(room: string, chatListener: (chat: Chat) => void) {
    this.socket.on(room, (chat: Chat) => {
      chatListener(chat);
    });
  }

  disconnectFromRoom(room: string) {
    this.socket.off(room);
  }
}
