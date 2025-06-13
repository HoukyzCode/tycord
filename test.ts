import { Ping } from './src/commands/ping'
import { InteractionManager } from './src/lib/entities/interaction-manager.entity'
import { Client } from './src/main'

const client = new Client({
	intents: [],
	interactionSync: {
		deleteUnknownInteractions: false
	}
})

client.on('ready', async () => {})

client.login(process.env.TOKEN as string)
