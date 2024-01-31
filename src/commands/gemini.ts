import { SlashCommandBuilder, type Interaction, type CacheType, Client, EmbedBuilder } from "discord.js"
import { model } from "../utils/gemini"
import type { Manager } from "erela.js"
import { builder, silentMessage } from "../utils/message"



const handler = {
	data: new SlashCommandBuilder()
		.setName("gemini")
		.setDescription('Try gemini Pro!')
		.addStringOption(option =>
			option.setName('prompt')
				.setDescription('Input your prompt').setRequired(true))

	,
	async execute(interaction: Interaction<CacheType>, client: Client, manager : Manager) {

		if (!interaction.isChatInputCommand()) return
		const prompt = interaction.options.get('prompt', true).value as string


	
		const result = await model.generateContent(prompt);
		const response = await result.response;

		const text = response.text();

		await silentMessage(interaction, `Prompt: ${prompt}`, text )

	}
}
export default handler