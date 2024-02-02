import { CacheType, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export const builder =  (title : string , description : string) => new EmbedBuilder().setColor(0xF29FBB).setTitle(title).setDescription(description)

export const silentMessage = async( interaction : ChatInputCommandInteraction<CacheType> , title: string, description : string ) => {
	return await interaction.reply({embeds:[builder(title,description)], flags: [4096] as any})
}
export const silentMessageWithThumbnail = async( interaction : ChatInputCommandInteraction<CacheType> , title: string, description : string , thumbnail :string) => {
	return await interaction.reply({embeds:[builder(title,description).setThumbnail(thumbnail)], flags: [4096] as any})
}