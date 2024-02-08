import { CacheType, ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js"
import { LavalinkManager, MiniMap } from "lavalink-client"
import { RedisClientType } from "redis"


declare type InteractionExecuteFN = (client: BotClient, interaction: ChatInputCommandInteraction<CacheType>) => any;

export interface CustomRequester {
    id: string,
    username: string,
    avatar?: string,
}

export interface Event {
    name: string,
    execute: (client: BotClient, ...params: any) => any;
}


export interface Command {
    data: SlashCommandBuilder;
    execute: InteractionExecuteFN;
}

export interface BotClient extends Client {
    lavalink: LavalinkManager;
    commands: MiniMap<string, Command>;
    redis: RedisClientType;
    defaultVolume: number;
}