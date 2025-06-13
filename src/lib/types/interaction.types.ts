import type { CommandInteraction } from 'discord.js'

export const InteractionTypes = {
	CommandInteraction: 'commandInteraction'
} as const

export interface InteractionTypes {
	[InteractionTypes.CommandInteraction]: [interaction: CommandInteraction]
}

export const ApplicationCommandOptionTypes = {
	SubCommand: 1,
	SubCommandGroup: 2,
	String: 3,
	Integer: 4,
	Boolean: 5,
	User: 6,
	Channel: 7,
	Role: 8,
	Mentionable: 9,
	Number: 10,
	Attachment: 11
} as const

export type ApplicationCommandLocales = 'id' | 'en-US'

export type ApplicationCommandOptionChoice = {
	name: string
	name_localizations?: ApplicationCommandLocales[]
	value: string | number
}

export const ChannelTypes = {
	GuildText: 0,
	Dm: 1,
	GuildVoice: 2,
	GroupDm: 3,
	GuildCategory: 4,
	GuildAnnouncement: 5,
	AnnouncementThread: 10,
	PublicThread: 11,
	PrivateThread: 12,
	GuildStageVoice: 13,
	GuildDirectory: 14,
	GuildForum: 15,
	GuildMedia: 16
} as const

type ApplicationCommandOptionBase = {
	name: string
	type?: number
	name_localizations?: ApplicationCommandLocales[]
	description: string
	description_localizations?: ApplicationCommandLocales[]
	required?: boolean
	options?: ApplicationCommandOption[]
	channel_types?: number[]
	min_value?: number
	max_value?: number
	min_length?: number
	max_length?: number
}

type WithChoices = ApplicationCommandOptionBase & {
	choices?: ApplicationCommandOptionChoice[]
	autocomplete?: undefined
}

type WithAutocomplete = ApplicationCommandOptionBase & {
	choices?: undefined
	autocomplete?: boolean
}

type WithoutChoicesOrAutocomplete = ApplicationCommandOptionBase & {
	choices?: undefined
	autocomplete?: false
}

export type ApplicationCommandOption =
	| WithChoices
	| WithAutocomplete
	| WithoutChoicesOrAutocomplete
