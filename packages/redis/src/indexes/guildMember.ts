import { redis } from "@src/redis";
import { SchemaFieldTypes } from "redis";

redis.ft.create("IDX:GuildMember", {
  "$.user_id": {
    type: SchemaFieldTypes.TAG,
    AS: "user_id"
  },
  "$.guild_id": {
    type: SchemaFieldTypes.TAG,
    AS: "guild_id"
  }
}, {
  ON: "JSON",
  PREFIX: "SC:GuildMembers"
})