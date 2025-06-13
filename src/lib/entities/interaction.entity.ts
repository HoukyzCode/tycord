import type { TypeOrPromise } from '../utils/type-or-promise'
import { Lifecycle, type LifecycleContext } from './lifecycle.entity'
import type {
	ApplicationCommandOption,
	InteractionTypes
} from '../types/interaction.types'

export type InteractionJSON = {
	name: string
	description: string
	options: ApplicationCommandOption[]
}

export abstract class Interaction<
	K extends keyof InteractionTypes = typeof InteractionTypes.CommandInteraction
> extends Lifecycle {
	override readonly name: string
	readonly description: string
	readonly options: ApplicationCommandOption[]

	constructor(context: LifecycleContext, options?: ApplicationCommandOption) {
		super({
			name: options?.name ?? context.name,
			root: context.root
		})

		this.name = options?.name ?? context.name
		this.description = options?.description ?? 'no description.'
		this.options = options?.options ?? []
	}

	abstract execute(
		...args: K extends keyof InteractionTypes ? InteractionTypes[K] : unknown[]
	): TypeOrPromise<unknown>

	toJSON(): InteractionJSON {
		return {
			name: this.name,
			description: this.description,
			options: this.options
		}
	}
}
