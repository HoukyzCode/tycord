import type { CommandInteraction, CacheType } from 'discord.js'
import type { SlashTypes } from '../lib/types/slash.types'
import { Slash, type SlashOptions } from '../main'
import { WithOptions } from '../lib/decorators/with-options.decorator'

@WithOptions<SlashOptions>({
	name: 'ping',
	description: 'my ping',
	options: []
})
export class Ping extends Slash<typeof SlashTypes.CommandInteraction> {
	override async execute(slash: CommandInteraction<CacheType>): Promise<void> {
		await slash.followUp('Hello, World!')
	}
}

console.log(
	new Ping({
		name: 'Ping.ts',
		root: '/src/commands/Ping.ts'
	})
)
