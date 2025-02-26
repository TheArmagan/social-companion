import { RedisManager } from ".";

interface RedisGuildMember {
  user_id: string;
  guild_id: string;
  exp: number;
}

type IncrementableRedisGuildMemberKeys = {
  [K in keyof RedisGuildMember]: RedisGuildMember[K] extends number ? K : never;
}[keyof RedisGuildMember];

export class RedisGuildMemberManager {
  constructor(public manager: RedisManager) {

  }

  async *getAllGuildMemberIds() {
    const iterator = this.manager.client.scanIterator({
      TYPE: "string",
      MATCH: "SC:GuildMembers:*"
    });
    for await (const key of iterator) {
      const splitted = key.split(":");
      const userId = splitted.pop();
      const guildId = splitted.pop();
      yield { userId, guildId };
    }
  }

  async getGuildMember(guildId: string, userId: string): Promise<RedisGuildMember | null> {
    const data = await this.manager.client.json.get(`SC:GuildMember:${guildId}:${userId}`, {
      path: "$"
    });
    if (!data) return null;
    return data as unknown as RedisGuildMember;
  }

  async setGuildMember(guildId: string, userId: string, data: RedisGuildMember) {
    await this.manager.client.json.set(`SC:GuildMember:${guildId}:${userId}`, "$", data as any);
  }

  async setGuildMemberField<K extends keyof RedisGuildMember>(guildId: string, userId: string, field: K, value: RedisGuildMember[K]) {
    await this.manager.client.json.set(`SC:GuildMember:${guildId}:${userId}`, `$.${field}`, value as any);
  }

  async incrGuildMemberField<K extends IncrementableRedisGuildMemberKeys>(guildId: string, userId: string, field: K, value: number) {
    await this.manager.client.json.numIncrBy(`SC:GuildMember:${guildId}:${userId}`, `$.${field}`, value);
  }
}
