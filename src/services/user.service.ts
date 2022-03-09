import http from "./http.client";
import type { User } from "@/models/User";

export class UserService {
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const result = await http.post<User>("/users", {
      name: name,
      email: email,
      password: password,
    });
    return result.data;
  }
}
