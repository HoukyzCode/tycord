import { describe, it, expect } from 'vitest'
import { Slash } from '../src/main'
import { LifecycleManager } from '../src/lib/entities/lifecycle-manager.entity'

describe('Tests > Index', () => {
	it('Should be create an slash command.', () => {
		const slash = new Slash(
			{
				name: 'Ping.ts',
				root: '/src/commands/Ping.ts'
			},
			{
				name: 'ping',
				description: 'reply with ping.',
				options: []
			}
		)

		expect(slash.name).toBe('ping')
		expect(slash.root).toBe('/src/commands/Ping.ts')
		expect(slash.description).toBe('reply with ping.')
	})

	it('Should be create an lifecycle-manager.', async () => {
		const lifecycleManager = new LifecycleManager({
			name: 'commands:lifecycle',
			root: '/src/managers/commands-lifecycle.manager.ts'
		})

		const slash = new Slash(
			{
				name: 'Ping.ts',
				root: '/src/commands/Ping.ts'
			},
			{
				name: 'ping',
				description: 'reply with ping.',
				options: []
			}
		)

		const { LoggingObserver } = await import(
			'../src/lib/observers/logging.observer'
		)

		lifecycleManager
			.register(slash)
			.addObserver(new LoggingObserver())
			.load(slash)
	})
})
