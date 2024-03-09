import { Command } from "@/types/Client";
import { GuildMember, SlashCommandBuilder, VoiceChannel } from "discord.js";
import { silentMessageWithThumbnail } from "../utils/message";
import { formatMS_HHMMSS } from "@/utils/time";

export default {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play music")
		.addStringOption((option) =>
			option
				.setName("query")
				.setDescription("song name or url")
				.setRequired(true)
		),
	execute: async (client, interaction) => {
		if (!interaction.isChatInputCommand()) return;
		const query = interaction.options.get("query", true).value as string;
		const user = interaction.member?.user;
		const vcId = (interaction.member as GuildMember)?.voice?.channelId;

		if (!vcId)
			return interaction.reply({
				ephemeral: true,
				content: `Please Join Voice Channel`,
			});
		const vc = (interaction.member as GuildMember)?.voice
			?.channel as VoiceChannel;
		if (!vc.joinable || !vc.speakable)
			return interaction.reply({
				ephemeral: true,
				content: "I am not able to join your channel / speak in there.",
			});
		const guild_id = interaction.guildId;
		const txId = interaction.channelId;
		if (!user || !guild_id || !vc || !txId)
			return interaction.reply({
				ephemeral: true,
				content: "I am not able to join your channel / speak in there.",
			});

		const player =
			client.lavalink.getPlayer(guild_id) ||
			client.lavalink.createPlayer({
				guildId: guild_id,
				voiceChannelId: vcId,
				textChannelId: txId,
				selfDeaf: true,
				selfMute: false,
				instaUpdateFiltersFix: true, // optional
				volume: client.defaultVolume,
				applyVolumeAsFilter: false,
			});

		if (player.voiceChannelId !== vcId)
			return interaction.reply({
				ephemeral: true,
				content: "You need to be in my Voice Channel",
			});
		const connected = player.connected;

		if (!connected) await player.connect();

		const response = await player.search(query, interaction.user);
		if (!response || !response.tracks?.length) {
			player.disconnect()
			return interaction.reply({
				content: `Not found ${query}`,
				ephemeral: true,
			});
		}

		player.queue.add(response.tracks[0]); // add track
		if (!player.playing) await player.play();
		const t = response.tracks[0];

		return silentMessageWithThumbnail(
			interaction,
			"TRACK ADDED",
			`[${formatMS_HHMMSS(t.info.duration)}] [${t.info.title}](${t.info.uri
			}) (by ${t.info.author || "Unknown-Author"})`,
			t.info.artworkUrl ?? ""
		);
	},
} as Command;
