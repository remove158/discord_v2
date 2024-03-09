import { LavalinkManager, parseLavalinkConnUrl } from 'lavalink-client'
import { envConfig } from './config'
import type { BotClient } from './client'

const LavalinkNodesOfEnv = envConfig.LAVALINK_NODES.split(' ')
	.filter((v) => v.length)
	.map((url) => parseLavalinkConnUrl(url))

export const loadLavalink = (client: BotClient) => {
	client.lavalink = new LavalinkManager({
		nodes: LavalinkNodesOfEnv,
		sendToShard: (guildId, payload) =>
			client.guilds.cache.get(guildId)?.shard?.send(payload),
		client: {
			id: envConfig.CLIENT_ID
		}
	})
}
