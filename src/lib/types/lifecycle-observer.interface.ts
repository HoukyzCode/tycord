import type { Lifecycle } from '../entities/lifecycle.entity'

export interface LifecycleObserver {
	onLoad?(from: string, lifecycle: Lifecycle): void
	onUnload?(from: string, reason: string, lifecycle: Lifecycle): void
	onError?(from: string, message?: string): void
}
