import { defineStore } from "pinia";
import { MongoUserService } from "@/services/mongoUser.service";
import type { MongoUser } from "@/models/mongoUser";

const mongoUserService: MongoUserService = new MongoUserService();

export const MongoUserStore = defineStore({
  id: "mongoUserStore",
  state: () => ({
    mongoUsers: [] as MongoUser[],
  }),
  actions: {
    createMongoUser(username: string, gender: string, age: number) {
      mongoUserService
        .createMongoUser(username, gender, age)
        .catch((err) => console.log(err.message));
    },
    gettAllMongoUsers() {
      mongoUserService
        .getAllMongoUsers()
        //Add user one by one instead of this.users = users to prevent an exception
        .then((mongoUsers) => {
          this.mongoUsers.forEach((mongoUser, index) => {
            delete this.mongoUsers[index];
          });
          mongoUsers.forEach((mongoUser) => {
            this.mongoUsers.push(mongoUser);
          });
        });
    },
  },
});
