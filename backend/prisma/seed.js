import { PrismaClient } from "@prisma/client";
import { users } from "./users.js";

const prismaClient = new PrismaClient();

async function seedUsers() {
  try {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      await prismaClient.user.create({
        data: {
          nama: user.name,
          email: user.email,
          saldo: user.balance,
        },
      });
    }
    console.log("seed users is success");
  } catch (error) {
    console.log("failed to seed users");
  }
}

seedUsers();
