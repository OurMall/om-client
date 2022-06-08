import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, Observable, Subject, take, tap, throwError } from 'rxjs';

import { ApiResponse, User } from '@app/common/interfaces';
import { MessageService } from '@app/common/services';

@Injectable({
	providedIn: 'root',
})
export class UserService {

	private readonly prefix: string = 'user';
	private userSubject$: Subject<User> = new Subject<User>();
	private isOpen: boolean = false;

	@Output() toggle: EventEmitter<boolean> = new EventEmitter();

	constructor(
		private readonly http: HttpClient,
		private readonly router: Router,
		private message: MessageService
	) {}

	account(): Observable<User> {
		return this.http.get<User>(`${this.prefix}/account/`).pipe(
			tap({
				next: (user) => {
					this.userSubject$.next(user);
				},
			}),
			catchError((err: HttpErrorResponse) => {
				return throwError(() => err);
			})
		);
	}

	specific_account(id: string): Observable<User> {
		return this.http.get<User>(`${this.prefix}/account/${id}`).pipe(
			take(1),
			catchError((err: HttpErrorResponse) => {
				this.message.error("No se encontró el perfil");
				return throwError(() => err);
			})
		)
	}

	editAccount(id: string, account: User): Observable<any> {
		return this.http.patch(`${this.prefix}/account/${id}`, account, {
		}).pipe(
			tap({
				next: (response) => {
					console.log(response);
				},
				complete: () => {
					this.message.success("Tu cuenta ha sido actualizada", "Completado");
				}
			}),
			catchError((err: HttpErrorResponse) => {
				this.message.error("Parece que hubo un error", "Oh-no!")
				return throwError(() => console.log(err));
			})
		)
	}

	addGroupToUser(code_name: string): Observable<any> {
		return this.http.post(`${this.prefix}/group`, code_name).pipe(
			take(1),
			catchError((err: HttpErrorResponse) => {
				return throwError(() => err);
			})
		);
	}

	sendAccountVerification(email: string): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${this.prefix}/account/sendVerification`, email);
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

	get user$(): Observable<User> {
		return this.userSubject$.asObservable();
	}
}
