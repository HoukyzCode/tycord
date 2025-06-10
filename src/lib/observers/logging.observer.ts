import type { Lifecycle } from '../entities/lifecycle.entity'
import type { LifecycleObserver } from '../types/lifecycle-observer.interface'

export class LoggingObserver implements LifecycleObserver {
	onLoad(from: string, lifecycle: Lifecycle): void {
		console.log(`[${from}] ${lifecycle.name} has been loaded.`)
	}

	onUnload(from: string, reason: string, lifecycle: Lifecycle): void {
		console.log(
			`[${from}] ${lifecycle.name} has been unloaded. Reason: ${reason}`
		)
	}

	onError(from: string, message?: string): void {
		console.log(`[${from}] ${message ?? 'Unexpected error.'}`)
	}
}
