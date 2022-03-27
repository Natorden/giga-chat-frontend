import type { MongoUser } from "@/models/mongoUser";
import http from "./http.client";

export class MongoUserService {
  async createMongoUser(
    name: string,
    gender: string,
    age: number
  ): Promise<MongoUser> {
    const result = await http.post<MongoUser>("/profiles", {
      name: name,
      gender: gender,
      age: age,
    });
    return result.data;
  }

  async getAllMongoUsers(): Promise<MongoUser[]> {
    const result = await http.get<MongoUser[]>("/promises");
    return result.data;
  }
}
