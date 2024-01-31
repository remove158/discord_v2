// import discord.js
import { Client, Collection, Events, GatewayIntentBits, InteractionType, } from 'discord.js';
import 'dotenv/config'
import { CLIENT_ID, TOKEN } from './utils/discord';
import { COMMANDS, COMMANDS_COLLECTION } from './utils/commands';
import { createManager } from './utils/erela';

// create a new Client instance
const client = new Client({
	intents: [GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildVoiceStates]
});


const MANAGER = createManager(client)


client.application?.commands.set(COMMANDS.map(e => e.data))



// listen for the client to be ready
client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	console.log(`Started refreshing ${COMMANDS.length} application (/) commands.`)
	client.application?.commands.set(COMMANDS.map(e => e.data))
	console.log(`Successfully reloaded ${COMMANDS.length} application (/) commands.`)

	MANAGER.init(CLIENT_ID)

});


client.on(Events.InteractionCreate, async interaction => {
	if (interaction.type !== InteractionType.ApplicationCommand) return
	const command = COMMANDS_COLLECTION.get(interaction.commandName)

	try {
		if (!command) return
		// await interaction.deferReply()
		console.log(`${interaction.member?.user.username} > ${interaction.commandName}`)
		await command.execute(interaction, client, MANAGER)

	} catch (err) {
		console.error(err)
		await interaction.editReply("ERROR")

	}

})

client.on(Events.ChannelDelete, channel => {
	const player = MANAGER.players.get(channel.id)
    if(!player) return;
    if(channel.id === player.voiceChannel) player.destroy();
    if(channel.id === player.textChannel) player.textChannel = null;
})

client.on(Events.GuildDelete, channel => {
	const player = MANAGER.players.get(channel.id)
	if(!player) return; 
	player.destroy();
})

client.on(Events.Raw, data => {
	MANAGER.updateVoiceState(data);
})

// login with the token from .env.local
client.login(TOKEN);
