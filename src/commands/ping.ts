import type { Command } from '@/client'
import { SlashCommandBuilder } from 'discord.js'

export default {
	data: new SlashCommandBuilder().setName('ping').setDescription('test ping'),
	execute: (client, interaction) => {
		return 'OK'
	}
} as Command
