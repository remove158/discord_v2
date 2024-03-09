import { config } from 'dotenv'
import { parseEnv } from 'znv'
import { z } from 'zod'

config()

export const envConfig = parseEnv(process.env, {
	DISCORD_TOKEN: z.string(),
	CLIENT_ID: z.string()
})
