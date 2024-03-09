import type { Client, SlashCommandBuilder } from 'discord.js'
import type { LavalinkManager } from 'lavalink-client/dist/types'

type InteractionExecuteFN = (
	client: BotClient,
	interaction: ChatInputCommandInteraction<CacheType>
) => unknown

type Command = {
	data: SlashCommandBuilder
	execute: InteractionExecuteFN
}

type BotClient = {
	lavalink: LavalinkManager
	commands: MiniMap<string, Command>
} & Client
