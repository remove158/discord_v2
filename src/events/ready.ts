import { Events } from 'discord.js'
import type { Event } from '@/client'

export default {
	name: Events.ClientReady,
	execute: async (client) => {
		console.log('[Discord Bot] Ready to be used!')
		await client.lavalink.init({ ...client.user!, shards: 'auto' }) //VERY IMPORTANT!
	}
} as Event
