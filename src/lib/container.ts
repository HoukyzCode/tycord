import type { Client } from '../main'

export type Container = {
	client?: Client
}

export const container: Container = {}
