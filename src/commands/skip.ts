
import { SlashCommandBuilder, type Interaction, type CacheType, Client, EmbedBuilder } from "discord.js"
import type { Manager } from "erela.js"
import { builder, silentMessage } from "../utils/message"



const handler = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription('Skip current song')

	,
	async execute(interaction: Interaction<CacheType>, client: Client, manager: Manager) {

		if (!interaction.isChatInputCommand()) return

		const player = manager.players.get(interaction.channelId)
		if (!player || !player.playing) return await silentMessage(interaction,'ข้ามเพลงไม่ได้', 'ข้ามไม่ได้เนื่องจากไม่มีเพลงที่กำลังเล่น')

		player.stop()
		await silentMessage(interaction,'ข้ามเพลง', 'ข้ามเพลงเรียบร้อยแล้ว')
	
	}
}
export default handler