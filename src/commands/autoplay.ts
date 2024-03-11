import type { Command } from '@/client'
import { createEmbed, replySilent } from '@/utils/message'
import { SlashCommandBuilder } from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('autoplay')
		.setDescription('toggle autoplay'),

	execute: async (client, interaction) => {
		if (!interaction.guildId) return
		const guildId = interaction.guildId
		const currentState = client.autoplay.get(guildId) ?? false
		client.autoplay.set(guildId, !currentState)
		const embed = createEmbed(
			'AUTOPLAY',
			`Autoplay: ${currentState ? 'OFF' : 'ON'}`
		)
		replySilent(interaction, embed)
	}
} as Command
