import type { Client, SlashCommandBuilder, CacheType } from 'discord.js'
import type { LavalinkManager, MiniMap } from 'lavalink-client'

type InteractionExecuteFN = (
	client: BotClient,
	interaction: ChatInputCommandInteraction<CacheType>
) => any

type AutoCompleteExecuteFN = (
	client: BotClient,
	interaction: AutocompleteInteraction
) => any

type Command = {
	data: SlashCommandBuilder
	execute: InteractionExecuteFN
	autocomplete?: AutoCompleteExecuteFN
}

type subCommandExecute = { [subCommandName: string]: InteractionExecuteFN }

type subCommandAutocomplete = {
	[subCommandName: string]: AutoCompleteExecuteFN
}

type SubCommand = {
	data:
	| SlashCommandSubcommandBuilder
	| SlashCommandSubcommandGroupBuilder
	| SlashCommandSubcommandsOnlyBuilder
	execute: subCommandExecute
	autocomplete?: subCommandAutocomplete
}

type Event = {
	name: string
	execute: (client: BotClient, ...params: any) => any
}

type BotClient = {
	lavalink: LavalinkManager
	commands: MiniMap<string, Command>
	autoplay: MiniMap<string, boolean>
} & Client
