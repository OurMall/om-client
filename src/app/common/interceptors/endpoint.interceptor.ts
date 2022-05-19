import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

import { environment } from '@environment/environment';
import { LoaderService, LocalStorageService, SessionStorageService } from '@app/common/services';

@Injectable()
export class EndpointInterceptor implements HttpInterceptor {

	private readonly endpoint: string = environment.authorizationServer.endpoint;

	constructor(
		private loaderService: LoaderService,
		private localStorageService: LocalStorageService,
		private sessionStorage: SessionStorageService
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		this.loaderService.showLoader();
		const request: HttpRequest<any> = req.clone({
			url: `${this.endpoint}/${req.url}`,
			withCredentials: true,
			//TODO: remove interceptors headers if I got an error.
			headers: new HttpHeaders({
				Authorization: `Bearer ${this.localStorageService.get("access_token")}`,
				knownAuthorization: `Bearer ${this.sessionStorage.get("known_token")}`
			})
		});
		return next.handle(request).pipe(
			finalize(() => this.loaderService.hideLoader())
		);
	}
}
