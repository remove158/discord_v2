import type { Client } from "discord.js";
import { Manager } from "erela.js";






export function createManager(client: Client<boolean>) {
	const manager = new Manager({
		nodes: [{
			host: "localhost",
			password: "password",
			port: 2333,
			secure: false,
		}]
		, send(id, payload) {
			const guild = client.guilds.cache.get(id);
			if (!guild) return;
			guild.shard.send(payload);
		},
	})

	return manager.on("nodeCreate", (node) => {
		console.log(`Created the Node: ${node.options.identifier} on host: ${node.options.host}`);
	}).on("nodeCreate", (node) => {
        console.log(`Created the Node: ${node.options.identifier} on host: ${node.options.host}`);
    })
    .on("nodeConnect", (node) => {
        console.log(`Connection to the Node: ${node.options.identifier} on host: ${node.options.host} was successful`);
    })
    .on("nodeReconnect", (node) => {
        console.log(`The Node: ${node.options.identifier} on host: ${node.options.host} is now attempting a reconnect`);
    })
    // .on("nodeDisconnect", (node) => {
    //     console.error(`Connection of the Node: ${node.options.identifier} on host: ${node.options.host}, disconnected`);
    // })
    // .on("nodeError", (node, error) => {
    //     console.error(`Node: ${node.options.identifier} on host: ${node.options.host} errored:`, error);
    // })


}