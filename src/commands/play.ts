import { SlashCommandBuilder, type Interaction, type CacheType, Client, GuildMember, VoiceChannel } from "discord.js"
import type { Manager } from "erela.js"
import { builder, silentMessage, silentMessageWithThumbnail } from "../utils/message"
import { Command } from "@/types/Client"
import { formatMS_HHMMSS } from "@/utils/time"



export default {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription('play music')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('song name or url').setRequired(true))
	,
	execute: async (client, interaction) => {
		if (!interaction.isChatInputCommand()) return
		const query = interaction.options.get('query', true).value as string
		const user = interaction.member?.user
		const vcId = (interaction.member as GuildMember)?.voice?.channelId;

		if (!vcId) return await silentMessage(interaction,'คุณไม่ได้อยู่ใน Voice Channel', 'กรุณาเข้า Voice Channel')

		const vc = (interaction.member as GuildMember)?.voice?.channel as VoiceChannel;
		if(!vc.joinable || !vc.speakable) return  await silentMessage(interaction, "Fail", "I am not able to join your channel / speak in there." );
		const guild_id = interaction.guildId
		const txId = interaction.channelId
		if (!user || !guild_id || !vc || !txId) return await silentMessage(interaction,'Fail', `Something went wrong`)
		


		const player = client.lavalink.getPlayer(guild_id) || client.lavalink.createPlayer({
            guildId: guild_id, 
            voiceChannelId: vcId, 
            textChannelId: txId, 
            selfDeaf: true, 
            selfMute: false,
            volume: client.defaultVolume,  
            applyVolumeAsFilter: false
      
        });
        
        const connected = player.connected;

        if(!connected) await player.connect();

		const response =  await player.search(query, interaction.user)
		if (!response || !response.tracks?.length  || response.tracks.length == 0) {
			await silentMessage(interaction,'ไม่พบเพลง', `ไม่พบเพลง ${query}`)
		}

		player.queue.add(response.tracks[0]); // add track
		if ( !player.playing)  await player.play()
		const track =  response.tracks[0].info
		const duration = formatMS_HHMMSS(track.duration)
		
		await silentMessageWithThumbnail(interaction, 'เพิ่มเพลง',  `[${track.title}](${track.uri}) (${duration})`, track.artworkUrl ?? "")


	}
} as Command