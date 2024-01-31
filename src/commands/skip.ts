
import { SlashCommandBuilder, type Interaction, type CacheType, Client, EmbedBuilder } from "discord.js"
import type { Manager } from "erela.js"
import { builder } from "../utils/embed"



const handler = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription('Skip current song')

	,
	async execute(interaction: Interaction<CacheType>, client: Client, manager : Manager) {

		if (!interaction.isChatInputCommand()) return

		const player = manager.players.get(interaction.channelId)
		if (!player?.playing) return await interaction.editReply({embeds:[builder('ไม่มีเพลงที่เล่นอยู่', 'ไม่สามารถข้ามได้เนื่องจากไม่มีเพลงที่เล่นอยู่')]})
		
		
		const song = player.queue.at(0)

		if (song) {
			player.stop()
			await interaction.editReply({
				embeds: [builder(`ข้ามเพลง`, `ข้ามเพลง ${song.title}`)]
			})
		}

		return await interaction.editReply({embeds:[builder('ไม่มีเพลงที่เล่นอยู่', 'ไม่สามารถข้ามได้เนื่องจากไม่มีเพลงที่เล่นอยู่')]})

	}
}
export default handler