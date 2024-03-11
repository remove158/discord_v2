import {
	ChatInputCommandInteraction,
	Events,
	type Interaction
} from 'discord.js'

import type { Command, Event } from '@/client'

export default {
	name: Events.InteractionCreate,
	execute: async (client, interaction: Interaction) => {
		if (!interaction.isCommand() && !interaction.isAutocomplete()) return

		const command = client.commands.get(interaction.commandName)
		if (!command)
			return console.error(
				`No command matching ${interaction.commandName} was found.`
			)
		try {
			if (interaction.isCommand()) {
				// execute command
				return await (command as Command).execute(
					client,
					interaction as ChatInputCommandInteraction<'cached'>
				)
			}
			if (interaction.isAutocomplete()) {
				if (!(command as Command).autocomplete)
					return console.error(
						`[Command-Error] Command is missing property "autocomplete".`
					)
				// execute command-autocomplete
				return await (command as Command).autocomplete?.(
					client,
					interaction
				)
			}
		} catch (error) {
			console.error(error)
			if (interaction.isAutocomplete()) return
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: 'There was an error while executing this command!',
					ephemeral: true
				})
			} else {
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true
				})
			}
		}
	}
} as Event
