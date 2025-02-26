import { redis } from "@src/redis";
import { SchemaFieldTypes } from "redis";

redis.ft.create("IDX:User", {
  "$.user_id": {
    type: SchemaFieldTypes.TAG,
    AS: "user_id"
  }
}, {
  ON: "JSON",
  PREFIX: "SC:Users:"
});