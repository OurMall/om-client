import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, ReplaySubject, Subject, tap, throwError } from 'rxjs';

import { User } from '@app/common/interfaces';

@Injectable({
	providedIn: 'root',
})
export class UserService {

	private userSubject$: Subject<User> = new ReplaySubject<User>();
	user$: Observable<User> = this.userSubject$.asObservable();

	constructor(
		private readonly http: HttpClient
	) {
	}

	account(): Observable<User> {
		return this.http.get<User>("user/account/").pipe(
			tap({
				next: (response) => {
					console.log(response);
					this.userSubject$.next(response);
				},
				complete: () => {
					console.log("Transaction complete...");
				}
			}),
			catchError((err: HttpErrorResponse) => {
				return throwError(() => console.log(err));
			})
		);
	}
}
