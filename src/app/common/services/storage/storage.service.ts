export class StorageService {
	private storage: Storage;

	constructor(storage: Storage) {
		this.storage = storage;
	}

	get(key: string): any {
		let item: any = this.storage.getItem(key)
			? this.storage.getItem(key)
			: undefined;
		return item;
	}

	set(key: string, value: any): void {
		//this.storage.setItem(key, JSON.stringify(value));
		this.storage.setItem(key, value);
	}

	remove(key: string): void {
		this.storage.removeItem(key);
	}

	clear(): void {
		this.storage.clear();
	}
}
