import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, Observable, take, tap, throwError, BehaviorSubject } from 'rxjs';

import { environment } from '@environment/environment';
import { SessionStorageService } from '@app/common/services';
import { KnownToken } from '@app/common/interfaces';

@Injectable({
	providedIn: 'root',
})
export class AuthorizationService {

	private _knownTokenSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		private sessionStorageService: SessionStorageService,
		private readonly http: HttpClient
	) {}

	authorizeKnownClient(): Observable<KnownToken> {
		return this.http
			.post<KnownToken>('oauth2/known', {
				application_id: environment.authorizationServer.application_id,
				application_secret: environment.authorizationServer.application_secret,
			})
			.pipe(
				take(1),
				filter((response) => response && !!response),
				tap((response) => {
					this.sessionStorageService.set('known_token', response.known_token);
				}),
				catchError((err: HttpErrorResponse) => {
					return throwError(() => err);
				})
			);
	}

	hasKnownToken(): Observable<boolean> {
		this.sessionStorageService.get('known_token') ? this._knownTokenSubject$.next(true) : this._knownTokenSubject$.next(false);
		return this._knownTokenSubject$.asObservable();
	}

	get knownToken$(): Observable<boolean> {
		return this.hasKnownToken();
	}
}
