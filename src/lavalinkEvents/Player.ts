import { BotClient, CustomRequester } from "@/types/Client";
import { builder, silentMessage } from "@/utils/message";
import { formatMS_HHMMSS } from "@/utils/time";
import { TextChannel } from "discord.js";

export function PlayerEvents(client: BotClient) {
	/**
	 * PLAYER EVENTS
	 */
	client.lavalink.on("queueEnd", (player) => {
		const channel = client.channels.cache.get(
			player.textChannelId!
		) as TextChannel;
		console.log(":: QUE ENDED ::", channel.name)
		player.disconnect();
	});

	/**
	 * Queue/Track Events
	 */
	client.lavalink.on("trackStart", (player, track) => {
		const channel = client.channels.cache.get(
			player.textChannelId!
		) as TextChannel;
		const title = `🎶 ${track.info.title}`.substring(0, 256);
		const contents = [
			`> - **Author:** ${track.info.author}`,
			`> - **Duration:** ${formatMS_HHMMSS(
				track.info.duration
			)} | Ends <t:${Math.floor(
				(Date.now() + track.info.duration) / 1000
			)}:R>`,
			`> - **Source:** ${track.info.sourceName}`,
			`> - **Requester:** <@${(track.requester as CustomRequester).id}>`,
		]
			.filter((v) => typeof v === "string" && v.length)
			.join("\n")
			.substring(0, 4096);

		return channel.send({
			embeds: [
				builder(title, contents).setThumbnail(track.info.artworkUrl),
			],
			flags: [4096] as any,
		});
	});
}
