
import { Command } from "@/types/Client";
import { CommandInteractionOptionResolver, GuildMember, SlashCommandBuilder } from "discord.js";
import { silentMessage } from "../utils/message";



export default {
    data: new SlashCommandBuilder()
        .setName("clear").setDescription("Empty the queue")
    ,
    execute: async (client, interaction) => {
        if (!interaction.guildId) return;
        const vcId = (interaction.member as GuildMember)?.voice?.channelId;
        const player = client.lavalink.getPlayer(interaction.guildId);
        if (!player) return interaction.reply({ ephemeral: true, content: "I'm not connected" });
        if (!vcId) return interaction.reply({ ephemeral: true, content: "Join a Voice Channel " });
        if (player.voiceChannelId !== vcId) return interaction.reply({ ephemeral: true, content: "You need to be in my Voice Channel" })

        await player.stopPlaying()

        await silentMessage(interaction,
            "Clear queue", "Queue is now empty !"
        );
    }
} as Command;