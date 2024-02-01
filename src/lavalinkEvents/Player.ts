import { BotClient } from "@/types/Client";

export function PlayerEvents(client:BotClient) {
	client.lavalink.on('queueEnd', (player) => {
		player.destroy()
	})
}