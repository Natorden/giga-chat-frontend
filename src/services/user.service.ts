import http from "./http.client";
import type { User } from "@/models/User";
import type { LoginDto } from "@/models/Login.dto";

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

  async logIn(login: LoginDto): Promise<User> {
    const result = await http.post<User>("/log-in", login);
    return result.data;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await http.get<User[]>("/users");
    return result.data;
  }

  async getUserById(id: string): Promise<User> {
    const result = await http.get<User>("/users/" + id);
    return result.data;
  }
}
