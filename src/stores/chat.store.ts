import { defineStore } from "pinia";
import type { Chat } from "@/models/Chat";
import { ChatService } from "@/services/chat.service";
import type { Room } from "@/models/Room";
import type { User } from "@/models/User";

const chatService = new ChatService();

export const ChatStore = defineStore({
  id: "ChatStore",
  state: () => ({
    room: "",
    rooms: [] as Room[],
    selectedRoom: undefined as Room | undefined,
    isTyping: [] as User[],
    isListening: [] as string[],
  }),
  getters: {
    roomSelected: (state) => {
      if (state.selectedRoom != undefined) return state.selectedRoom;
      return undefined;
    },
    userTyping: (state) => {
      if (state.isTyping != undefined) return state.isTyping;
      return undefined;
    },
  },
  actions: {
    createChat(text: string) {
      if (this.selectedRoom != undefined) {
        const user = JSON.parse(<string>localStorage.getItem("user")) as User;

        const chat: Chat = {
          text: text,
          room: this.selectedRoom.uuid,
          user: user,
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
      const user = JSON.parse(<string>localStorage.getItem("user")) as User;
      chatService.getAllRooms(user.uuid).then((rooms) => (this.rooms = rooms));
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
    newRoom(name: string) {
      const user = JSON.parse(<string>localStorage.getItem("user")) as User;
      chatService
        .createRoom(name, user.uuid)
        .then((room) => this.rooms.push(room));
    },
    onUserTyping(chat: Chat) {
      chat.room = this.room;
      chatService.userIsTyping(chat);
    },
    updateTyping() {
      if (this.isListening.indexOf("typing") == -1) {
        chatService.updateIsTyping((data: User[]) => {
          this.isTyping = [];
          data.forEach((user) => {
            if (this.isTyping.find((usr) => usr.uuid == user.uuid) == null) {
              this.isTyping.push(user);
            }
          });
        });
        this.isListening.push("typing");
      }
    },
  },
});
