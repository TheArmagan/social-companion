import { redis, RedisClientType } from "@social-companion/redis";
import { SocialCompanion } from "../SocialCompanion";
import { RedisGuildMemberManager } from "./RedisGuildMemberManager";
import { RedisUserManager } from "./RedisUserManager";

export class RedisManager {
  client: RedisClientType = redis;
  users = new RedisUserManager(this);
  members = new RedisGuildMemberManager(this);
  constructor(public sc: SocialCompanion) { }
}