import { defineStore } from "pinia";
import type { Chat } from "@/models/Chat";
import { ChatService } from "@/services/chat.service";
import type { Room } from "@/models/Room";
import { UserStore } from "@/stores/user.store";
import type { User } from "@/models/User";

const chatService = new ChatService();

export const ChatStore = defineStore({
  id: "ChatStore",
  state: () => ({
    room: "",
    rooms: [] as Room[],
    selectedRoom: undefined as Room | undefined,
  }),
  actions: {
    createChat(text: string) {
      if (this.selectedRoom != undefined) {
        const user = JSON.parse(<string>localStorage.getItem("user")) as User;

        const chat: Chat = {
          text: text,
          room: this.selectedRoom.uuid,
          userUUID: user.uuid,
        };
        chatService.createChat(chat);
      }
    },
    receiveChat(chat: Chat) {
      if (this.selectedRoom != undefined) {
        this.selectedRoom.chats.push(chat);
      }
    },
    loadRooms() {
      chatService.getAllRooms().then((rooms) => (this.rooms = rooms));
    },
    selectRoom(roomUUID: string) {
      if (this.selectedRoom != undefined)
        chatService.disconnectFromRoom(this.selectedRoom.uuid);

      chatService.loadRoom(roomUUID).then((room) => {
        this.selectedRoom = room;
        chatService.listenToRoom(room.uuid, (chat) => {
          this.receiveChat(chat);
        });
      });
    },
  },
});
