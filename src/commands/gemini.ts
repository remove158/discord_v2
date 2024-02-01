import { SlashCommandBuilder } from "discord.js"
import { model } from "../utils/gemini"
import {  silentMessage } from "../utils/message"
import { Command } from "@/types/Client"



export default {
	data: new SlashCommandBuilder()
		.setName("gemini")
		.setDescription('Try gemini Pro!')
		.addStringOption(option =>
			option.setName('prompt')
				.setDescription('Input your prompt').setRequired(true))
	,
	execute: async (client, interaction) => {

		if (!interaction.isChatInputCommand()) return
		const prompt = interaction.options.get('prompt', true).value as string



		const result = await model.generateContent(prompt);
		const response = await result.response;

		const text = response.text();

		await silentMessage(interaction, `Prompt: ${prompt}`, text)

	}
} as Command