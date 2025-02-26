import { Database } from "./Database";
import { RedisManager } from "./RedisManager";

export class SocialCompanion {
  db = Database.client;
  redisManager = new RedisManager(this);

  constructor() { }
}