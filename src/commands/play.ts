import { SlashCommandBuilder, type Interaction, type CacheType, Client } from "discord.js"
import type { Manager } from "erela.js"
import { builder } from "../utils/embed"
import { Player } from "erela.js"



const handler = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription('play music')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('song name or url').setRequired(true))
	,
	async execute(interaction: Interaction<CacheType>, client: Client, manager: Manager) {
		if (!interaction.isChatInputCommand()) return
		const query = interaction.options.get('query', true).value as string
		const user = interaction.member?.user
		const voice_channel_id = (interaction as any).member.voice.channel.id

		const guild_id = interaction.guildId
		const text_channel_id = interaction.channelId
		if (!user || !guild_id || !voice_channel_id || !text_channel_id) return 	await interaction.editReply({
			embeds: [builder('ไม่พบเพลง', `ไม่พบผลการค้นหา: ${query}`)
			]
		})
		let player : Player | undefined = manager.players.get(guild_id)
		if (! player) {
			// console.log('Create new player for' , voice_channel_id);
			
			player = manager.create({
				guild: guild_id,
				voiceChannel: voice_channel_id,
				textChannel: text_channel_id,
				selfDeafen: true,
			});
		}
		
		if (player.state !== "CONNECTED") {
			await player.connect();
		}

		const result = await player.search(query)
		if (result.tracks.length == 0) {
			await interaction.editReply({ embeds: [builder('ไม่พบเพลง', `ไม่พบเพลง ${query}`)] })
		}

		player.queue.add(result.tracks[0]); // add track
		if(!player?.queue?.totalSize || (!player.paused && !player.playing)) { 
			player.play()
			if (!player.paused && !player.playing) player.pause(false)
		}

		await interaction.editReply({
			embeds: [builder('เพิ่มเพลง', result.tracks[0].title).setThumbnail(result.tracks[0].thumbnail)
			]
		})


	}
}
export default handler