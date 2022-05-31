import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, Observable, Subject, take, tap, throwError } from 'rxjs';

import { User } from '@app/common/interfaces';
import { MessageService } from '@app/common/services';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	@Output() toggle: EventEmitter<boolean> = new EventEmitter();
	private readonly prefix: string = 'user';
	private isOpen: boolean = false;
	private userSubject$: Subject<User> = new Subject<User>();
	user$: Observable<User> = this.userSubject$.asObservable();

	constructor(
		private readonly http: HttpClient,
		private readonly router: Router,
		private message: MessageService
	) {}

	account(): Observable<User> {
		return this.http.get<User>(`${this.prefix}/account/`).pipe(
			tap({
				next: (user) => {
					console.log(user);
					this.userSubject$.next(user);
				},
			}),
			catchError((err: HttpErrorResponse) => {
				return throwError(() => console.log(err));
			})
		);
	}

	addGroupToUser(code_name: string): Observable<any> {
		return this.http.post(`${this.prefix}/group`, code_name).pipe(
			take(1),
			tap((response) => {
				console.log(response);
			}),
			catchError((err: HttpErrorResponse) => {
				console.log(err);
				return throwError(() => err);
			})
		);
	}

	verifyAccount(token: string): Observable<any> {
		return this.http.post(`${this.prefix}/account/verify`, token).pipe(
			take(1),
			filter((response) => response && !!response),
			tap({
				complete: () => {
					setTimeout(() => {
						this.message.success('Hemos verificado la cuenta', 'Felicidades');
						this.router.navigate(['']);
					}, 5000);
				},
			}),
			catchError((err: HttpErrorResponse) => {
				this.message.error('La cuenta ya ha sido verificada', 'Vaya!');
				return throwError(() => err);
			})
		);
	}

	toggleAccount(): void {
		this.isOpen = !this.isOpen;
		this.toggle.emit(this.isOpen);
	}
}
