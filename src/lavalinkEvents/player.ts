import type { BotClient } from '@/client'
import { createEmbed } from '@/utils/message'
import { formatMS_HHMMSS } from '@/utils/time'
import type { TextChannel } from 'discord.js'

export function PlayerEvents(client: BotClient) {
	client.lavalink.on('trackStart', (player, track) => {
		console.log(
			player.guildId,
			' :: Started Playing :: ',
			track.info.title,
			'QUEUE:',
			player.queue.tracks.map((v) => v.info.title)
		)
		const channel = client.channels.cache.get(
			player.textChannelId!
		) as TextChannel
		if (!channel) return
		const TITLE = `🎶 ${track.info.title}`
		const tmp_body = [
			`> - **Author:** ${track.info.author}`,
			`> - **Duration:** ${formatMS_HHMMSS(track.info.duration)} | Ends <t:${Math.floor((Date.now() + track.info.duration) / 1000)}:R>`,
			`> - **Source:** ${track.info.sourceName}`,
			`> - **Requester:** ${track.requester}`,
			track.pluginInfo?.clientData?.fromAutoplay
				? `> *From Autoplay* ✅`
				: undefined
		]
		if (player.queue?.tracks.length > 0) {
			const timestamps: number[] = []
			player.queue?.tracks.reduce((sum, cur) => {
				timestamps.push(sum + (cur.info.duration ?? 0))
				return sum + (cur.info.duration ?? 0)
			}, 0)

			const BODY =
				'**Upcomming**\n' +
				player.queue?.tracks
					.map(
						(track, idx) =>
							`> - ${track.info.title} | <t:${Math.floor((Date.now() + timestamps[idx]) / 1000)}:R>`
					)
					.join('\n')
			tmp_body.push(BODY)
		}
		const BODY = tmp_body
			.filter((v) => typeof v === 'string' && v.length)
			.join('\n')
			.substring(0, 4096)

		const embed = createEmbed(TITLE, BODY)
		// local tracks are invalid uris
		embed.setThumbnail(track.info.artworkUrl)

		if (/^https?:\/\//.test(track.info.uri)) embed.setURL(track.info.uri)
		return channel.send({
			embeds: [embed],
			flags: [4096] as any
		})
	})
}
