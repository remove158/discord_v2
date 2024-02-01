import { Events } from "discord.js";
import { Event } from "@/types/Client";

export default {
    name: Events.GuildDelete,
    execute: async (client, channel) => {
		const player = client.lavalink.getPlayer(channel.id)
		if(!player) return;
		player.destroy();
    }
} as Event;