import { envConfig } from '@/config'
import { Client, GatewayIntentBits } from 'discord.js'
import type { BotClient } from './client'
import { loadCommands } from './handlers/commandLoader'
import { loadEvents } from './handlers/eventsLoader'
import { loadLavalink } from './lavalink'
import { loadLavalinkEvents } from './lavalinkEvents'
import { MiniMap } from 'lavalink-client'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages
	]
}) as BotClient

client.autoplay = new MiniMap()
loadLavalink(client)
loadCommands(client)
loadEvents(client)
loadLavalinkEvents(client)

client.login(envConfig.DISCORD_TOKEN)
