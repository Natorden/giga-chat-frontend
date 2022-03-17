import {io} from "socket.io-client";
import http from "@/services/http.client";
import type {Request} from "@/models/Request";

export class RequestService {
    socket = io("localhost:3001");

    constructor() {
        this.socket.connect();
    }

    sendRequest(senderId: string, receiverId: string) {
        const request: Request = {
            senderUserId: senderId,
            receiverUserId: receiverId
        }

        this.socket.emit('createRequest', request);
    }

    async getRequestsByUserId(userId: string): Promise<Request[]> {
        const result = await http.get<Request[]>("/requests/" + userId);
        return result.data;
    }
}