import type { Command } from '@/client'
import { createEmbed, replySilent } from '@/utils/message'
import {
	CommandInteractionOptionResolver,
	GuildMember,
	SlashCommandBuilder
} from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('See the queue'),

	execute: async (client, interaction) => {
		if (!interaction.guildId) return
		const vcId = (interaction.member as GuildMember)?.voice?.channelId
		const player = client.lavalink.getPlayer(interaction.guildId)
		if (!player)
			return interaction.reply({
				ephemeral: true,
				content: "I'm not connected"
			})
		if (!vcId)
			return interaction.reply({
				ephemeral: true,
				content: 'Join a Voice Channel '
			})

		const TITLE = 'QUEUE'
		const timestamps: number[] = []
		player.queue.tracks.reduce((sum, cur) => {
			timestamps.push(sum + (cur.info.duration ?? 0))
			return sum + (cur.info.duration ?? 0)
		}, 0)

		const BODY = player.queue.tracks
			.map(
				(track, idx) =>
					`${idx + 1}. \`${track.info.title}\` <t:${Math.floor((Date.now() + timestamps[idx]) / 1000)}:R>`
			)
			.join('\n')

		const embded = createEmbed(TITLE, BODY ?? 'Queue Empty')

		await replySilent(interaction, embded)
	}
} as Command
