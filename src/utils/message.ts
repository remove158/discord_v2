import { EmbedBuilder } from '@discordjs/builders'
import type { CacheType, ChatInputCommandInteraction } from 'discord.js'

const COLOR = 0xf29fbb
const SILENT_FLAGS = [4096] as any

export const createEmbed = (title: string, description: string) =>
	new EmbedBuilder()
		.setColor(COLOR)
		.setTitle(title)
		.setDescription(description)

export const replySilent = async (
	interaction: ChatInputCommandInteraction<CacheType>,
	embded: EmbedBuilder
) => await interaction.reply({ embeds: [embded], flags: SILENT_FLAGS })
