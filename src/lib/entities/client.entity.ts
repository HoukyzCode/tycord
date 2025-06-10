import {
	Client as DClient,
	type ClientOptions as DClientOptions
} from 'discord.js'

export interface ClientOptions extends DClientOptions {}

export class Client<T extends boolean = boolean> extends DClient<T> {
	constructor(options: ClientOptions) {
		super({
			rest: {
				retries: 5,
				timeout: 30_000
			},
			...options
		})
	}
}

export namespace Tycord {}
