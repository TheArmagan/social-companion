import { PrismaClient } from "@prisma/client";
import { Database } from "./Database";

export class SocialCompanion {
  db = Database.client;
  constructor() { }
}