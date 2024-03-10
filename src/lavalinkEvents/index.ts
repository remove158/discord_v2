import type { BotClient } from '@/client'
import { NodesEvents } from './nodes'
import { PlayerEvents } from './player'

export function loadLavalinkEvents(client: BotClient) {
	NodesEvents(client)
	PlayerEvents(client)
}
