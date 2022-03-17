import {io} from "socket.io-client";
import type {Request} from "@/models/Request";
import http from "@/services/http.client";
import type {User} from "@/models/User";

export class RequestService {
    socket = io("localhost:3001");

    constructor() {
        this.socket.connect();
    }

    sendRequest(senderId: string, receiverId: string) {
        const request: Request = {
            senderId: senderId,
            receiverId: receiverId
        }

        this.socket.emit('createRequest', request);
    }

    async getRequestsByUserId(userId: string): Promise<User[]> {
        const result = await http.get("/requests/" + userId);
        return result.data;
    }
}