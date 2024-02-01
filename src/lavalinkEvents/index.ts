import { BotClient } from "../types/Client";
import { NodesEvents } from "./Node";
import { PlayerEvents } from "./Player";

export function loadLavalinkEvents(client:BotClient) {
    NodesEvents(client);
    PlayerEvents(client);
}