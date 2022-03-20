import { io } from "socket.io-client";
import type { Chat } from "@/models/Chat";
import type { Room } from "@/models/Room";
import http from "./http.client";
import type { User } from "@/models/User";

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

  async getAllRooms(uuid: string): Promise<Room[]> {
    const res = await http.get<Room[]>(`/rooms/user/${uuid}`);
    return res.data;
  }

  async loadRoom(uuid: string): Promise<Room> {
    const res = await http.get<Room>(`/rooms/${uuid}`);
    return res.data;
  }

  async createRoom(name: string, userUUID: string): Promise<Room> {
    const res = await http.post<Room>(`/rooms`, { name, userUUID });
    return res.data;
  }

  userIsTyping(chat: Chat) {
    this.socket.emit("isTyping", chat);
  }

  updateIsTyping(continueChat: (data: User[]) => void) {
    return this.socket.on("getIsTyping", (args) => {
      continueChat(args);
    });
  }
}
