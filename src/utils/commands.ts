import { Collection } from "discord.js"
import  Gemini from "../commands/gemini"
import Play from "../commands/play"
import Skip from "../commands/skip"

export type COMMAND_TYPE = typeof Gemini
export const COMMANDS = [Gemini, Play, Skip]
export const COMMANDS_COLLECTION = COMMANDS.reduce((data, cur) => (data.set(cur.data.name, cur)), new Collection<string, any>())