import { envConfig } from '@/config'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import type { BotClient } from './client'
import { loadCommands } from './handlers/commandLoader'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages
	]
}) as BotClient

client.on(Events.ClientReady, () => {
	console.log('[DISCORD BOT] Ready to be used!')
})

loadCommands(client)

client.login(envConfig.DISCORD_TOKEN)
