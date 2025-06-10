export const LifecycleEvents = {
	Error: 'error',
	Load: 'load',
	Unload: 'unload',
	ExecuteSlashCommand: 'executeSlashCommand'
} as const

export interface LifecycleEvents {
	[LifecycleEvents.Error]: [payload: { from: string; message: string }]
	[LifecycleEvents.Load]: [payload: { from: string; message?: string }]
	[LifecycleEvents.Unload]: [payload: { from: string; reason?: string }]
	[LifecycleEvents.ExecuteSlashCommand]: [
		payload: { from: string; message?: string }
	]
}
