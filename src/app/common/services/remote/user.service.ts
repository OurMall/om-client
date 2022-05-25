import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '@app/common/interfaces';

@Injectable({
	providedIn: 'root',
})
export class UserService {

	private userSubject$!: BehaviorSubject<User>;

	constructor(
		private readonly http: HttpClient
	) {}

	account(): Observable<User> {
		return this.http.get<User>("user/account").pipe();
	}
}
