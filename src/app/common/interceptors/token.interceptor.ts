import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService, LocalStorageService } from '@app/common/services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(
		private localStorageService: LocalStorageService,
		private authService: AuthenticationService
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err: HttpErrorResponse) => {
				if (
					(err instanceof HttpErrorResponse && err.status == 401) ||
					(400 && this.authService)
				) {
					this.authService
						.refreshAccessToken(this.localStorageService.get('refresh_token'))
						.subscribe({
							next: (response) => {
								const req: HttpRequest<any> = request.clone({
									headers: new HttpHeaders({
										Authorization: `Bearer ${response.access_token}`,
									}),
								});
								return next.handle(req);
							},
							error: (err: HttpErrorResponse) => {
								console.log(err);
								this.authService.logOut();
								return throwError(() => err);
							},
						});
				}
				return throwError(() => err);
			})
		);
	}
}
