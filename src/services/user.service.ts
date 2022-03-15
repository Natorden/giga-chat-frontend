import http from "./http.client";
import type { User } from "@/models/User";

export class UserService {
  async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const result = await http.post<User>("/users", {
      username: username,
      email: email,
      password: password,
    });
    return result.data;
  }

  async logIn(username: string, password: string): Promise<User> {
    const result = await http.post("/log-in", {
      username: username,
      password: password,
    });
    return result.data;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await http.get<User[]>('/users');
    return result.data
  }
}
