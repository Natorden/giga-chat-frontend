import { io } from "socket.io-client";
import type { Chat } from "@/models/Chat";
import type { Room } from "@/models/Room";
import http from "./http.client";

export class ChatService {
  socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
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

  async getAllRooms(): Promise<Room[]> {
    const res = await http.get<Room[]>("/rooms");
    return res.data;
  }

  async loadRoom(uuid: string): Promise<Room> {
    const res = await http.get<Room>(`/rooms/${uuid}`);
    return res.data;
  }
}
