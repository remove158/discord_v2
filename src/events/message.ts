import {
	type ApplicationCommandDataResolvable,
	Events,
	Message
} from 'discord.js'
import type { Event } from '@/client'
import { REST, Routes } from 'discord.js'
import { envConfig } from '@/config'

const rest = new REST({ version: '10' }).setToken(envConfig.DISCORD_TOKEN)

export default {
	name: Events.MessageCreate,
	execute: async (client, message: Message) => {
		if (message.content === '?setcommand') {
			try {
				const commands = client.commands.map((v) =>
					v.data.toJSON()
				) as ApplicationCommandDataResolvable[]

				await rest.put(
					Routes.applicationCommands(envConfig.CLIENT_ID),
					{
						body: commands
					}
				)
				message.reply(
					`Loaded ${client.commands.size} slash (/) commands`
				)
			} catch {
				message.reply(`Fail to load command`)
			}
		}

		if (message.content === '?newcommand' && message.guildId) {
			try {
				await rest.put(
					Routes.applicationGuildCommands(
						envConfig.CLIENT_ID,
						message.guildId
					),
					{
						body: []
					}
				)
				message.reply(
					`Loaded ${client.commands.size} slash (/) commands`
				)
			} catch {
				message.reply(`Fail to load command`)
			}
		}
	}
} as Event
