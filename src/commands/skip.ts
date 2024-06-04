import type { Command } from '@/client'
import { createEmbed, replySilent } from '@/utils/message'
import {
	CommandInteractionOptionResolver,
	GuildMember,
	SlashCommandBuilder
} from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current track'),
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
		if (player.voiceChannelId !== vcId)
			return interaction.reply({
				ephemeral: true,
				content: 'You need to be in my Voice Channel'
			})

		const current = player.queue.current
		const nextTrack = player.queue?.tracks[0]

		await player.skip(0, false)
		const TITLE = 'TRACK SKIPPED'
		const BODY = nextTrack
			? `Skipped [${current?.info.title}](${current?.info.uri}) -> [${nextTrack?.info.title}](${nextTrack?.info.uri})`
			: `Skipped [${current?.info.title}](${current?.info.uri})`

		const embded = createEmbed(TITLE, BODY)

		await replySilent(interaction, embded)
	}
} as Command
