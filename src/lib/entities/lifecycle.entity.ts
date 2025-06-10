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
	public readonly name: string
	public readonly root: string
	private eventEmitter!: EventEmitter

	constructor(options: LifecycleContext) {
		this.name = options.name
		this.root = options.root
	}

	public beforeExecute(): TypeOrPromise<void> {}
	public afterExecute(): TypeOrPromise<void> {}

	public on<K extends keyof LifecycleEvents>(
		eventName: K,
		listener: (
			...args: K extends keyof LifecycleEvents ? LifecycleEvents[K] : unknown[]
		) => void
	): Lifecycle {
		this.eventEmitter.on(eventName, listener)

		return this
	}

	public once<K extends keyof LifecycleEvents>(
		eventName: K,
		listener: (
			...args: K extends keyof LifecycleEvents ? LifecycleEvents[K] : unknown[]
		) => void
	): Lifecycle {
		this.eventEmitter.once(eventName, listener)

		return this
	}

	public emit<K extends keyof LifecycleEvents>(
		eventName: K,
		...args: K extends keyof LifecycleEvents ? LifecycleEvents[K] : unknown[]
	): boolean {
		return this.eventEmitter.emit(eventName, ...args)
	}
}
