import { EmbedBuilder } from "discord.js";

export const builder =  (title : string , description : string) => new EmbedBuilder().setColor(0xE4A0F7).setTitle(title).setDescription(description)