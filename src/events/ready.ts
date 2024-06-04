import {
	Events,
	REST,
	Routes,
	type ApplicationCommandDataResolvable
} from 'discord.js'
import type { Event } from '@/client'
import { envConfig } from '@/config'

const rest = new REST({ version: '10' }).setToken(envConfig.DISCORD_TOKEN)

export default {
	name: Events.ClientReady,
	execute: async (client) => {
		console.log('[Discord Bot] Ready to be used!')
		await client.lavalink.init({ ...client.user!, shards: 'auto' }) //VERY IMPORTANT!
		const commands = client.commands.map((v) =>
			v.data.toJSON()
		) as ApplicationCommandDataResolvable[]

		await rest.put(Routes.applicationCommands(envConfig.CLIENT_ID), {
			body: commands
		})
		console.log(`Loaded ${commands.length} slash (/) commands`)
	}
} as Event
