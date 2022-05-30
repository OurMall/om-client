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

	isLoggedIn$: Observable<boolean> = this.authenticationService.accessToken$;
	user$: Observable<User> = this.userService.user$;
	suscription!: Subscription;
	links!: any;
	active: boolean = false;

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
		this.suscription = this.authenticationService.accessToken$.subscribe((_) => {
			this.userService.account().subscribe();
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

	displayAccount(): void {
		this.active = !this.active;
		this.userService.toggleAccount();
	}
}
