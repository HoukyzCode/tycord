import type { TypeOrPromise } from '../utils/type-or-promise'
import { Lifecycle, type LifecycleContext } from './lifecycle.entity'
import type { SlashTypes } from '../types/slash.types'

export type SlashOptions = {
	name: string
	description: string
	options: string[]
}

export abstract class Slash<K extends keyof SlashTypes> extends Lifecycle {
	override readonly name: string
	readonly description: string

	constructor(context: LifecycleContext, options?: SlashOptions) {
		super({
			name: options?.name ?? context.name,
			root: context.root
		})

		this.name = options?.name ?? context.name
		this.description = options?.description ?? 'no description.'
	}

	abstract execute(
		...args: K extends keyof SlashTypes ? SlashTypes[K] : unknown[]
	): TypeOrPromise<unknown>
}
