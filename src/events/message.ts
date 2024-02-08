import { ApplicationCommandDataResolvable, Events, Message } from "discord.js";
import { Event } from "@/types/Client";
import { envConfig } from "@/config";

export default {
    name: Events.MessageCreate,
    execute: async (client, message: Message) => {
        if (message.author.username === envConfig.dev.ownerId && message.content === "?setcommand") {
            try {
                await client.application.commands.set(client.commands.map(v => v.data.toJSON()) as ApplicationCommandDataResolvable[])
                message.reply(`Loaded ${client.commands.size} slash (/) commands`)
            } catch {
                message.reply(`Fail to load command`)
            }
        }
    }
} as Event;