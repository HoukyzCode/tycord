import { container } from '../container'
import type { ApplicationCommandOption } from '../types/interaction.types'
import type { Interaction, InteractionJSON } from './interaction.entity'
import deepEqual from 'fast-deep-equal'

export type InteractionManagerOptions = {
	updateOldInteractions: boolean
	deleteUnknownInteractions: boolean
}

export type InteractionSync = {
	toUpdate: { old: InteractionJSON; new: InteractionJSON }[]
	toDelete: InteractionJSON[]
	toCreate: InteractionJSON[]
}

function normalizeInteraction(interaction: Interaction): InteractionJSON {
	return {
		...interaction.toJSON(),
		options: interaction.options
			.map(normalizeOption)
			.sort((a, b) => a.name.localeCompare(b.name))
	}
}

function normalizeOption(
	option: ApplicationCommandOption
): ApplicationCommandOption {
	return {
		...option,
		options: option.options
			?.map(normalizeOption)
			.sort((a, b) => a.name.localeCompare(b.name))
	}
}

export class InteractionManager {
	private interactions: Map<string, Interaction>
	private readonly options: InteractionManagerOptions

	private client = container.client

	constructor(options: InteractionManagerOptions) {
		this.interactions = new Map()
		this.options = options
	}

	add(interaction: Interaction): InteractionManager {
		this.interactions.set(interaction.name, interaction)
		return this
	}

	async sync(): Promise<void> {
		const commands = await this.client?.application?.commands.fetch()
		if (!commands) return

		const remote = commands.values().toArray() as InteractionJSON[]

		const local = this.interactions
			.values()
			.map((interaction) => normalizeInteraction(interaction))
			.toArray()

		const { toUpdate, toDelete, toCreate } = this.diff(local, remote)

		if (!toUpdate.length && !toDelete.length && !toCreate.length) {
			console.log('✅ All interactions are up to date.')
			return
		}

		console.log('🔄 Syncing interactions...')

		if (this.options.deleteUnknownInteractions && toDelete.length > 0) {
			for (const cmd of toDelete) {
				console.log(`❌ Deleted: ${cmd.name}`)
			}
		}

		if (this.options.updateOldInteractions && toUpdate.length > 0) {
			for (const { old, new: updated } of toUpdate) {
				console.log(`♻️ Updated: ${updated.name}`)
			}
		}

		for (const cmd of toCreate) {
			console.log(`➕ Created: ${cmd.name}`)
		}

		console.log('✅ Interactions synced successfully.')
	}

	private diff(
		localInteractions: InteractionJSON[],
		remoteInteractions: InteractionJSON[]
	): InteractionSync {
		const localMap = new Map(
			localInteractions.map((interaction) => [interaction.name, interaction])
		)
		const remoteMap = new Map(
			remoteInteractions.map((interaction) => [interaction.name, interaction])
		)

		const toUpdate: { old: InteractionJSON; new: InteractionJSON }[] = []
		const toDelete: InteractionJSON[] = []
		const toCreate: InteractionJSON[] = []

		for (const [name, local] of localMap) {
			const remote = remoteMap.get(name)

			if (!remote) {
				toCreate.push(local)
			} else if (!deepEqual(local, remote)) {
				toUpdate.push({ old: remote, new: local })
			}
		}

		for (const [name, remote] of remoteMap) {
			if (!localMap.has(name)) {
				toDelete.push(remote)
			}
		}

		return { toUpdate, toDelete, toCreate }
	}
}
