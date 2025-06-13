import type { LifecycleObserver } from '../types/lifecycle-observer.interface'
import { LifecycleEvents } from '../types/lifecycle.types'
import type { Lifecycle } from './lifecycle.entity'

export type LifecycleManagerOptions = {
	name: string
	root: string
}

export class LifecycleManager {
	readonly name: string
	readonly root: string

	private lifecycles: Map<string, Lifecycle>
	private observers: LifecycleObserver[]

	constructor(options: LifecycleManagerOptions) {
		this.name = options.name
		this.root = options.root

		this.lifecycles = new Map()
		this.observers = []
	}

	async loadAll(): Promise<void> {
		for (const lifecycle of this.lifecycles.values()) {
			this.load(lifecycle)
		}
	}

	load(lifecycle: Lifecycle): LifecycleManager {
		const payload = { from: this.name }

		lifecycle.emit(LifecycleEvents.Load, payload)
		this.notifyLoad(payload.from, lifecycle)

		this.lifecycles.set(lifecycle.name, lifecycle)

		return this
	}

	unload(lifecycle: Lifecycle): LifecycleManager {
		const payload = {
			from: this.name,
			reason: 'Request by manager.'
		}

		lifecycle.emit(LifecycleEvents.Unload, payload)
		this.notifyUnload(payload.from, payload.reason, lifecycle)

		this.lifecycles.delete(lifecycle.name)

		return this
	}

	register(lifecycle: Lifecycle): LifecycleManager {
		const alreadyExists = this.lifecycles.get(lifecycle.name)

		if (alreadyExists) this.unregister(lifecycle.name)

		lifecycle.on(LifecycleEvents.Error, ({ from, message }) => {
			this.notifyError(from, message)
		})

		this.load(lifecycle)

		return this
	}

	unregister(name: string): LifecycleManager {
		const alreadyExists = this.lifecycles.get(name)

		if (!alreadyExists) return this

		this.unload(alreadyExists)

		return this
	}

	addObserver(observer: LifecycleObserver): LifecycleManager {
		this.observers.push(observer)

		return this
	}

	notifyLoad(name: string, lifecycle: Lifecycle): void {
		for (const obs of this.observers) {
			obs.onLoad?.(name, lifecycle)
		}
	}

	notifyUnload(name: string, reason: string, lifecycle: Lifecycle) {
		for (const obs of this.observers) {
			obs.onUnload?.(name, reason, lifecycle)
		}
	}

	notifyError(name: string, message?: string) {
		for (const obs of this.observers) {
			obs.onError?.(name, message)
		}
	}
}
