import { CacheType, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export const builder =  (title : string , description : string) => new EmbedBuilder().setColor(0xE4A0F7).setTitle(title).setDescription(description)

export const silentMessage = async( interaction : ChatInputCommandInteraction<CacheType> , title: string, description : string ) => {
	return await interaction.reply({embeds:[builder(title,description)], flags: [4096] as any})
}