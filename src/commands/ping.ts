import type { CommandInteraction, CacheType } from 'discord.js'
import {
	ApplicationCommandOptionTypes,
	type ApplicationCommandOption,
	type InteractionTypes
} from '../lib/types/interaction.types'
import { Interaction } from '../main'
import { WithOptions } from '../lib/decorators/with-options.decorator'

@WithOptions<ApplicationCommandOption>({
	name: 'ping',
	description: 'my ping',
	options: [
		{
			name: 'gateways',
			description: 'which gateways ping',
			type: ApplicationCommandOptionTypes.String,
			required: true,
			choices: [
				{ name: 'discord', value: 'discord' },
				{ name: 'api', value: 'api' }
			]
		}
	]
})
export class Ping extends Interaction<
	typeof InteractionTypes.CommandInteraction
> {
	override async execute(
		interaction: CommandInteraction<CacheType>
	): Promise<void> {
		await interaction.followUp('Hello, World!')
	}
}
