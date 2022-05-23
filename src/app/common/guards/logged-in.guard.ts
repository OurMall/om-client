import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { AuthenticationService } from '@app/common/services';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {

	constructor(
		private readonly router: Router,
		private authenticationService: AuthenticationService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if(this.authenticationService.hasAccessToken()) {
			return true;
		}
		this.router.navigateByUrl("login");
		return false;
	}
}
