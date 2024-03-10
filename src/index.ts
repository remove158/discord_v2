import { envConfig } from '@/config'
import { Client, GatewayIntentBits } from 'discord.js'
import type { BotClient } from './client'
import { loadCommands } from './handlers/commandLoader'
import { loadEvents } from './handlers/eventsLoader'
import { loadLavalink } from './lavalink'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages
	]
}) as BotClient

loadLavalink(client)
loadCommands(client)
loadEvents(client)

client.login(envConfig.DISCORD_TOKEN)
