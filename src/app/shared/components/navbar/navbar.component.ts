import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from '@app/common/interfaces';
import { AuthenticationService, UserService } from '@app/common/services';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {

	isLoggedIn$: Observable<boolean> = this.authenticationService.hasAccessToken$();
	user$: Observable<User> = this.userService.user$;
	user!: User;
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
		this.userService.account().subscribe();
	}

	ngAfterViewInit(): void {
		this.user$.subscribe(user => {
			this.user = user;
		});
	}
}
