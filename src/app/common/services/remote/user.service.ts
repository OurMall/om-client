import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@app/common/interfaces';

@Injectable({
	providedIn: 'root',
})
export class UserService {

	constructor(
		private readonly http: HttpClient
	) {}

	account(): Observable<User> {
		return this.http.get<User>("user/account")
	}
}
