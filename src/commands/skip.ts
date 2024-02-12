import { Command } from "@/types/Client";
import {
    CommandInteractionOptionResolver,
    GuildMember,
    SlashCommandBuilder,
} from "discord.js";
import { silentMessage } from "../utils/message";

export default {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current track")
        .addIntegerOption((o) =>
            o
                .setName("skipto")
                .setDescription("to which song to skip to?")
                .setRequired(false)
        ),

    execute: async (client, interaction) => {
        if (!interaction.guildId) return;
        const vcId = (interaction.member as GuildMember)?.voice?.channelId;
        const player = client.lavalink.getPlayer(interaction.guildId);
        if (!player)
            return interaction.reply({
                ephemeral: true,
                content: "I'm not connected",
            });
        if (!vcId)
            return interaction.reply({
                ephemeral: true,
                content: "Join a Voice Channel ",
            });
        if (player.voiceChannelId !== vcId)
            return interaction.reply({
                ephemeral: true,
                content: "You need to be in my Voice Channel",
            });

        const current = player.queue.current;
        const nextTrack = player.queue.tracks[0];

        if (!nextTrack) {
            await player.destroy();
        } else {
            await player.skip(
                (
                    interaction.options as CommandInteractionOptionResolver
                ).getInteger("skipto", false) || 0
            );
        }

        await silentMessage(
            interaction,
            "TRACK SKIPPED",
            nextTrack
                ? `Skipped [${current?.info.title}](${current?.info.uri}) -> [${nextTrack?.info.title}](${nextTrack?.info.uri})`
                : `Skipped [${current?.info.title}](${current?.info.uri})`
        );
    },
} as Command;
