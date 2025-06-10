// biome-ignore lint/complexity/noBannedTypes: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Constructor<T = {}> = new (...args: any[]) => T

// biome-ignore lint/complexity/noBannedTypes: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T
