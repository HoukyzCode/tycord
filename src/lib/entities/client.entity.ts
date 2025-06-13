import { Client as DClient, type ClientOptions } from 'discord.js'
import { container } from '../container'
import {
	InteractionManager,
	type InteractionManagerOptions
} from './interaction-manager.entity'

export interface TycordClientOptions {
	interactionSync?: Partial<InteractionManagerOptions>
}

export class Client<T extends boolean = boolean> extends DClient<T> {
	constructor(options: ClientOptions) {
		super(options)

		container.client = this
	}

	override async login(token: string): Promise<string> {
		const interactionManager = new InteractionManager({
			deleteUnknownInteractions: true,
			updateOldInteractions: true,
			...this.options.interactionSync
		})

		console.log(interactionManager)

		return await super.login(token)
	}
}

declare module 'discord.js' {
	interface ClientOptions extends TycordClientOptions {}
}
