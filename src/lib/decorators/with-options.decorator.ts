import type { Constructor } from '../utils/constructor'

export function WithOptions<TOptions>(options: TOptions) {
	return <TBase extends Constructor>(Base: TBase) => {
		class WithOptions extends Base {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			constructor(...context: any[]) {
				super(...context, options)
			}
		}

		return WithOptions as unknown as Constructor<InstanceType<TBase>>
	}
}
