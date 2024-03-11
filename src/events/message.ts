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
		if (message.content === '?newcommand' && message.guildId) {
			try {
				const commands = client.commands.map((v) =>
					v.data.toJSON()
				) as ApplicationCommandDataResolvable[]

				await rest.put(
					Routes.applicationGuildCommands(
						envConfig.CLIENT_ID,
						message.guildId
					),
					{
						body: commands
					}
				)
				message.reply(
					`Loaded ${commands.length} local slash (/) commands`
				)
			} catch {
				message.reply(`Fail to load command`)
			}
		}

		if (message.content === '?clear' && message.guildId) {
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
				message.reply(`Clear local command`)
			} catch {
				message.reply(`Fail to load command`)
			}
		}
	}
} as Event
