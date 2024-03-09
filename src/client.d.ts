import type { Client, SlashCommandBuilder } from 'discord.js'
import type { LavalinkManager } from 'lavalink-client'

type InteractionExecuteFN = (
	client: BotClient,
	interaction: ChatInputCommandInteraction<'cached'>
) => unknow

type AutoCompleteExecuteFN = (
	client: BotClient,
	interaction: AutocompleteInteraction
) => unknow

type Command = {
	data: SlashCommandBuilder
	execute: InteractionExecuteFN
	autocomplete?: subCommandAutocomplete
}

type BotClient = {
	lavalink: LavalinkManager
	commands: MiniMap<string, Command>
} & Client
