import { Events } from 'discord.js'
import type { Event } from '@/client'

export default {
	name: Events.Raw,
	execute: async (client, d) => {
		client.lavalink.sendRawData(d) // VERY IMPORTANT!
	}
} as Event
