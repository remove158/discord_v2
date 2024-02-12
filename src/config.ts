import "dotenv/config";

export const envConfig = {
    token: process.env.DISCORD_TOKEN as string,
    clientId: process.env.CLIENT_ID as string,
    redis: {
        url: process.env.REDIS_URL as string,
        password: process.env.REDIS_PASSWORD as string,
    },
    dev: {
        ownerId: process.env.OWNER_ID as string,
    },
};
