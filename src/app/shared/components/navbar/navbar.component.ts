import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { User } from '@app/common/interfaces';
import { AuthenticationService, UserService } from '@app/common/services';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {

	isLoggedIn$: Subject<boolean> = new Subject<boolean>();
	user$: Subject<User> = new Subject<User>();
	suscription!: Subscription;
	links!: any;

	constructor(
		private authenticationService: AuthenticationService,
		private userService: UserService
	) {
		this.links = [
			{
				route: 'home',
				tooltip: 'Home',
				icon: 'uil uil-estate',
			},
			{
				route: 'workspaces',
				tooltip: 'Workspaces',
				icon: 'uil uil-newspaper',
			},
			{
				route: 'help',
				tooltip: 'Help',
				icon: 'uil uil-question',
			},
			{
				route: 'login',
				tooltip: 'Log In',
				icon: 'uil uil-signout',
			},
		];
	}

	ngOnInit(): void {
		this.suscription = this.authenticationService.accessToken$.subscribe((isLogged) => {
			this.isLoggedIn$.next(isLogged);
			this.userService.account().subscribe((user) => {
				this.user$.next(user);
			});
		})
	}

	ngAfterViewInit(): void {
		console.log("After view init");
	}

	ngOnDestroy(): void {
		this.suscription.unsubscribe();
	}

	onLogout(): void {
		this.authenticationService.logOut();
	}
}
