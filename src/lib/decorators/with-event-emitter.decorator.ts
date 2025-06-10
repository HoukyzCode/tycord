import type { AbstractConstructor } from '../utils/constructor'
import { EventEmitter } from 'node:events'

const EVENT_EMITTER_KEY = Symbol('eventEmitter')

export function WithEventEmitter<T extends AbstractConstructor>(Base: T) {
	abstract class WithEmitter extends Base {
		private eventEmitter: EventEmitter

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		constructor(...args: any[]) {
			super(...args)

			const proto = Object.getPrototypeOf(this)

			let emitter: EventEmitter | undefined = Reflect.getMetadata(
				EVENT_EMITTER_KEY,
				proto
			)

			if (!emitter) {
				emitter = new EventEmitter()
				Reflect.defineMetadata(EVENT_EMITTER_KEY, emitter, proto)
			}

			this.eventEmitter = emitter
		}
	}

	return WithEmitter as unknown as AbstractConstructor<InstanceType<T>>
}
