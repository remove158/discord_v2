
import { SlashCommandBuilder, type Interaction, type CacheType, Client, EmbedBuilder } from "discord.js"
import type { Manager } from "erela.js"
import { builder } from "../utils/embed"



const handler = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription('Skip current song')

	,
	async execute(interaction: Interaction<CacheType>, client: Client, manager: Manager) {

		if (!interaction.isChatInputCommand()) return

		const player = manager.players.get(interaction.channelId)
		if (!player || !player.playing) return await interaction.editReply({ embeds: [builder('ข้ามเพลงไม่ได้', 'ข้ามไม่ได้เนื่องจากไม่มีเพลงที่กำลังเล่น')] })

		player.stop()
		await interaction.editReply({
			embeds: [builder(`ข้ามเพลง`, `ข้ามเพลงเรียบร้อยแล้ว`)]
		})


	}
}
export default handler