import { ApplicationCommandDataResolvable, Events } from "discord.js";
import { Event } from "@/types/Client";

export default {
    name: Events.ClientReady,
    execute: async (client) => {
        console.log("[Discord Bot] Ready to be used!"); 
        await client.lavalink.init({ ...client.user!, shards: "auto" });  //VERY IMPORTANT!

        client.application.commands.set(client.commands.map(v => v.data.toJSON()) as ApplicationCommandDataResolvable[])
    }
} as Event;