import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@app/common/services';

@Injectable({
	providedIn: 'root',
})
export class NotLoggedGuard implements CanActivate {

	constructor(
		private readonly router: Router,
		private authenticationService: AuthenticationService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authenticationService.hasAccessToken()) {
			return true;
		}
		this.router.navigateByUrl('404');
		return false;
	}
}
