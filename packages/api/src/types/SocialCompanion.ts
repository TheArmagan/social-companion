import { PrismaClient } from "@prisma/client";

export class SocialCompanion {
  db = new PrismaClient().$extends({
    model: {
      user: {
        async hello() {
          return "World";
        }
      }
    }
  });
  constructor() { }
}