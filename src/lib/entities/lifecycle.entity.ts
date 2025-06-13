import { WithEventEmitter } from '../decorators/with-event-emitter.decorator'
import type { LifecycleEvents } from '../types/lifecycle.types'
import type { TypeOrPromise } from '../utils/type-or-promise'
import type { EventEmitter } from 'node:events'

export type LifecycleContext = {
	name: string
	root: string
}

@WithEventEmitter
export abstract class Lifecycle {
	readonly name: string
	readonly root: string
	private eventEmitter!: EventEmitter

	constructor(options: LifecycleContext) {
		this.name = options.name
		this.root = options.root
	}

	beforeExecute(): TypeOrPromise<void> {}
	afterExecute(): TypeOrPromise<void> {}

	on<K extends keyof LifecycleEvents>(
		eventName: K,
		listener: (
			...args: K extends keyof LifecycleEvents ? LifecycleEvents[K] : unknown[]
		) => void
	): Lifecycle {
		this.eventEmitter.on(eventName, listener)

		return this
	}

	once<K extends keyof LifecycleEvents>(
		eventName: K,
		listener: (
			...args: K extends keyof LifecycleEvents ? LifecycleEvents[K] : unknown[]
		) => void
	): Lifecycle {
		this.eventEmitter.once(eventName, listener)

		return this
	}

	emit<K extends keyof LifecycleEvents>(
		eventName: K,
		...args: K extends keyof LifecycleEvents ? LifecycleEvents[K] : unknown[]
	): boolean {
		return this.eventEmitter.emit(eventName, ...args)
	}
}
