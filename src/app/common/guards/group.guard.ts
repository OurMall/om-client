import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { MessageService, UserService } from '@app/common/services';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class GroupGuard implements CanActivate {

	constructor(
		private readonly router: Router,
		private userService: UserService,
		private message: MessageService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.userService.account().pipe(
			map(user => {
				const hasGroup = user.groups.find(group => group.code_name == route.data['group'])
				if(hasGroup) {
					return true;
				} else {
					this.message.warning("Debes ser un vendedor");
					this.router.navigateByUrl('404');
					return false;
				}
			}),
			catchError((err: HttpErrorResponse) => {
				this.router.navigateByUrl('404');
				return throwError(() => err);
			})
		)
	}
}
