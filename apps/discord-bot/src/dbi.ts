import { createDBI } from "@mostfeatured/dbi";

export const dbi = createDBI("social-companion", {
  discord: {
    token: process.env.DISCORD_TOKEN as string,
    options: {
      intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent",
        "GuildMembers"
      ],
    }
  },
  references: {
    autoClear: {
      ttl: 60000 * 60 * 6,
      check: 60000
    }
  }
});