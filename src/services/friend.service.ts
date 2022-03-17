import type {FriendDto} from "@/models/Friend.dto";
import http from "@/services/http.client";
import type {Friend} from "@/models/Friend";

export class FriendService {
    async create(friend: FriendDto): Promise<Friend> {
        const result = await http.post<Friend>("/friends", friend);
        return result.data;
    }
}