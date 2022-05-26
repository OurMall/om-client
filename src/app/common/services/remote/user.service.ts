import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, ReplaySubject, Subject, tap, throwError } from 'rxjs';

import { User } from '@app/common/interfaces';

@Injectable({
	providedIn: 'root',
})
export class UserService {

	private readonly prefix: string = "user";
	private userSubject$: Subject<User> = new Subject<User>();
	user$: Observable<User> = this.userSubject$.asObservable();

	constructor(
		private readonly http: HttpClient
	) {
	}

	account(): Observable<User> {
		return this.http.get<User>(`${this.prefix}/account/`).pipe(
			tap({
				next: (response) => {
					console.log(response);
					this.userSubject$.next(response);
					this.userSubject$.subscribe(user => {
						console.log(user);
					})
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

	addGroupToUser(code_name: string): Observable<any> {
		return this.http.post(`${this.prefix}/group`, code_name);
	}

	verifyAccount(token: string): Observable<any> {
		return this.http.post(`${this.prefix}/account/verify`, token);
	}
}
