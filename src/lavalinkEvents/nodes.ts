import type { BotClient } from '@/client'

export function NodesEvents(client: BotClient) {
	/**
	 * NODE EVENTS
	 */
	client.lavalink.nodeManager
		.on('raw', (node, payload) => {
			//console.log(node.id, " :: RAW :: ", payload);
		})
		.on('disconnect', (node, reason) => {
			console.log(node.id, ' :: DISCONNECT :: ', reason)
		})
		.on('connect', (node) => {
			console.log(node.id, ' :: CONNECTED :: ')
		})
		.on('reconnecting', (node) => {
			console.log(node.id, ' :: RECONNECTING :: ')
		})
		.on('create', (node) => {
			console.log(node.id, ' :: CREATED :: ')
		})
		.on('destroy', (node) => {
			console.log(node.id, ' :: DESTROYED :: ')
		})
		.on('error', (node, error, payload) => {
			console.log(
				node.id,
				' :: ERRORED :: ',
				error,
				' :: PAYLOAD :: ',
				payload
			)
		})
		.on('resumed', (node, payload, players) => {
			{
				console.log(
					node.id,
					' :: RESUMED :: ',
					players.length,
					' PLAYERS STILL PLAYING :: PAYLOAD ::',
					payload
				)
				console.log(players)
			}
		})
}
