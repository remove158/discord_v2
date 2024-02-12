import { Events } from "discord.js";
import { Event } from "@/types/Client";

export default {
    name: Events.ChannelDelete,
    execute: async (client, channel) => {
        const player = client.lavalink.getPlayer(channel.id);
        if (!player) return;
        if (channel.id === player.voiceChannelId) player.destroy();
        if (channel.id === player.textChannelId) player.textChannelId = null;
    },
} as Event;
