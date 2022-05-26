import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { tap, filter, take, catchError } from 'rxjs/operators';

import { SessionStorageService, LocalStorageService } from '@app/common/services';
import { AccessToken, UserLogin, UserSignup } from '@app/common/interfaces';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {

	private _accessToken$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private sessionStorageService: SessionStorageService,
		private localStorageService: LocalStorageService,
		private readonly http: HttpClient
	) {}

	signUp(user: UserSignup): Observable<AccessToken> {
		return this.http.post<AccessToken>("oauth2/signup", user).pipe(
			take(1),
			filter(response => response && !!response),
			tap((response) => {
				this.localStorageService.set("access_token", response.access_token);
				this.localStorageService.set("refresh_token", response.refresh_token);
				this._accessToken$.next(true);
			}),
			catchError((err: HttpErrorResponse) => {
				return throwError(() => err);
			})
		);
	}

	logIn(user: UserLogin): Observable<AccessToken> {
		return this.http.post<AccessToken>("oauth2/login", user).pipe(
			take(1),
			filter(response => response && !!response),
			tap((response) => {
				console.log(response);
				this.localStorageService.set("access_token", response.access_token);
				this.localStorageService.set("refresh_token", response.refresh_token);
				this._accessToken$.next(true);
			}),
			catchError((err: HttpErrorResponse) => {
				return throwError(() => err);
			})
		);
	}

	logOut(): void {
		this.localStorageService.remove("access_token");
		this.localStorageService.remove("refresh_token");
		this._accessToken$.next(false);
	}

	refreshAccessToken(refreshToken: string): Observable<AccessToken> {
		return this.http.post<AccessToken>("oauth2/token", refreshToken).pipe(
			tap((response) => {
				this.localStorageService.set("access_token", response.access_token);
				this.localStorageService.set("refresh_token", response.refresh_token);
			})
		);
	}

	hasAccessToken$(): Observable<boolean> {
		this.localStorageService.get("access_token") ? this.accessToken$.next(true): this.accessToken$.next(false);
		return this.accessToken$.asObservable();
	}

	hasAccessToken(): boolean {
		if(!this.localStorageService.get("access_token")) {
			this.accessToken$.next(false);
			return false;
		}
		this.accessToken$.next(true);
		return true;
	}

	get accessToken$() {
		return this._accessToken$;
	}
}
