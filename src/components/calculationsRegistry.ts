import {ICity} from '../@types/city';

class CalculationsRegistry {
	protected result: Record<string, ICity[]|null> = {}

	has(key: string): boolean {
		return key in this.result;
	}

	remove(key: string) {
		if (this.has(key)) {
			delete this.result[key];
		}
	}

	get(key: string) {
		if (this.has(key)) {
			return this.result[key];
		} else {
			throw new Error('trying to get non-existing key')
		}
	}

	set(key: string, value: ICity[]|null) {
		this.result[key] = value;
	}
}

export const calculationsRegistry = new CalculationsRegistry();