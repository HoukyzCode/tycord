import type { CommandInteraction } from 'discord.js'

export const SlashTypes = {
	CommandInteraction: 'commandInteraction'
} as const

export interface SlashTypes {
	[SlashTypes.CommandInteraction]: [slash: CommandInteraction]
}
