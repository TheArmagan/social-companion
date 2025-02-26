import { RedisManager } from ".";


interface RedisUser {
  user_id: string;
  exp: number;
}

type IncrementableRedisUserKeys = {
  [K in keyof RedisUser]: RedisUser[K] extends number ? K : never;
}[keyof RedisUser];

export class RedisUserManager {
  constructor(public manager: RedisManager) {

  }

  async *getAllUserIds() {
    const iterator = this.manager.client.scanIterator({
      TYPE: "string",
      MATCH: "SC:Users:*"
    });
    for await (const key of iterator) {
      yield key.split(":").pop();
    }
  }

  async getUser(userId: string): Promise<RedisUser | null> {
    const data = await this.manager.client.json.get(`SC:Users:${userId}`, {
      path: "$"
    });
    if (!data) return null;
    return data as unknown as RedisUser;
  }

  async setUser(userId: string, data: RedisUser) {
    await this.manager.client.json.set(`SC:Users:${userId}`, "$", data as any);
  }

  async setUserField<K extends keyof RedisUser>(userId: string, field: K, value: RedisUser[K]) {
    await this.manager.client.json.set(`SC:Users:${userId}`, `$.${field}`, value as any);
  }

  async incrUserField<K extends IncrementableRedisUserKeys>(userId: string, field: K, value: number) {
    await this.manager.client.json.numIncrBy(`SC:Users:${userId}`, `$.${field}`, value);
  }
}
