import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StorageService {

	private storage: Storage;

	constructor(storage: Storage) {
		this.storage = storage;
	}
}
