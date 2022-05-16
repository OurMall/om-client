import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, tap, filter, take, catchError, throwError, BehaviorSubject } from 'rxjs';

import { SessionStorageService, LocalStorageService } from '@app/common/services';
import { AccessToken, UserSignup } from '@app/common/interfaces';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {

	private accessToken$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		private sessionStorageService: SessionStorageService,
		private localStorageService: LocalStorageService,
		private readonly http: HttpClient
	) {}

	signUp(user: UserSignup): Observable<AccessToken> {
		return this.http.post<AccessToken>("oauth2/signup", user, {
			headers: new HttpHeaders({
				knownAuthorization: `Bearer ${this.sessionStorageService.get("known_token")}`
			})
		}).pipe(
			take(1),
			filter(response => response && !!response),
			tap((response) => {
				this.localStorageService.set("access_token", response.access_token);
				this.localStorageService.set("refresh_token", response.refresh_token);
			}),
			catchError((err: HttpErrorResponse) => {
				return throwError(() => err);
			})
		);
	}

	logIn(user: any): Observable<AccessToken> {
		return this.http.post<AccessToken>("oauth2/login", user, {
			headers: new HttpHeaders({
				knownAuthorization: `Bearer ${this.sessionStorageService.get("known_token")}`
			})
		}).pipe(
			take(1),
			filter(response => response && !!response),
			tap((response) => {
				console.log(response);
			}),
			catchError((err: HttpErrorResponse) => {
				return throwError(() => err);
			})
		);
	}

	logOut(): void {
		this.localStorageService.remove("access_token");
		this.localStorageService.remove("refresh_token");
		this.accessToken$.next(false);
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
		return this.localStorageService.get("access_token") ? true : false;
	}
}
