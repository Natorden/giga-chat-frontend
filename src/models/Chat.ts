import type {User} from "@/models/User";

export interface Chat {
    text: string;
    room: string;
    userUUID: string;
    user: User;
}
