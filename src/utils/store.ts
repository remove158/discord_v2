import { QueueStoreManager, StoredQueue } from "lavalink-client"
import { RedisClientType } from "redis"
export class myCustomStore implements QueueStoreManager {
	private redis: RedisClientType;
	constructor(redisClient: RedisClientType) {
		this.redis = redisClient;
	}
	async get(guildId): Promise<any> {
		return await this.redis.get(guildId);
	}
	async set(guildId, stringifiedQueueData): Promise<any> {
		// await this.delete(guildId); // some redis versions (especially on hset) requires you to delete it first;
		return await this.redis.set(guildId, stringifiedQueueData);
	}
	async delete(guildId): Promise<any> {
		return await this.redis.del(guildId);
	}
	async parse(stringifiedQueueData): Promise<Partial<StoredQueue>> {
		return JSON.parse(stringifiedQueueData);
	}
	async stringify(parsedQueueData): Promise<any> {
		return JSON.stringify(parsedQueueData);
	}
}