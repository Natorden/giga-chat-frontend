import type {Chat} from "@/models/Chat";

export interface Room {
    uuid: string;
    name: string;
    chats: Chat[];
}
