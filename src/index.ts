import { envConfig } from "@/config";
import { BotClient } from "@/types/Client";
import { Client, GatewayIntentBits } from "discord.js";
import { LavalinkManager, parseLavalinkConnUrl } from "lavalink-client";

import { loadCommands } from "@handlers/commandLoader";
import { loadEvents } from "@handlers/eventLoader";
import { myCustomStore } from "@utils/store";
import { createClient } from "redis";
import { loadLavalinkEvents } from "@/lavalinkEvents";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ],
}) as BotClient;

// if (envConfig.redis.url) {
// 	client.redis = createClient({ url: envConfig.redis.url, password: envConfig.redis.password });
// 	client.redis.connect();
// 	client.redis.on("error", (err) => console.log('Redis Client Error', err));
// } else {
// 	throw new Error(`Redis (${envConfig.redis.url}) not found`);
// }

const LavalinkNodesOfEnv = process.env.LAVALINKNODES?.split(" ")
    .filter((v) => v.length)
    .map((url) => parseLavalinkConnUrl(url));

client.lavalink = new LavalinkManager({
    nodes: LavalinkNodesOfEnv,
    sendToShard: (guildId, payload) =>
        client.guilds.cache.get(guildId)?.shard?.send(payload),
    client: {
        id: envConfig.clientId,
    },
    // queueOptions: {
    // 	queueStore: new myCustomStore(client.redis)
    // }
});

client.defaultVolume = 100;

loadCommands(client);
loadEvents(client);
loadLavalinkEvents(client);

client.login(envConfig.token);
