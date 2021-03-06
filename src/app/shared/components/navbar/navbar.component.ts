import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { User } from '@app/common/interfaces';
import { AuthenticationService, UserService, ThemeService, ThemeType } from '@app/common/services';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {

	isLoggedIn$: Observable<boolean> = this.authenticationService.accessToken$;
	user$: Observable<User> = this.userService.user$;

	active: boolean = false;
	display: boolean = false;
	suscription!: Subscription;
	links!: any;

	constructor(
		private authenticationService: AuthenticationService,
		private userService: UserService,
		private themeService: ThemeService
	) {
		this.links = [
			{
				route: 'home',
				tooltip: 'Inicio',
				icon: 'uil uil-estate',
			},
			{
				route: 'workspaces',
				tooltip: 'Espacios de trabajo',
				icon: 'uil uil-apps',
			},
			{
				route: 'support',
				tooltip: 'Soporte',
				icon: 'uil uil-question',
			},
		];
	}

	ngOnInit(): void {
		this.suscription = this.authenticationService.accessToken$.subscribe((_) => {
			this.userService.account().subscribe();
		});
	}

	ngAfterViewInit(): void {  }

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

	toggleSidebar(): void {
		this.display = !this.display;
	}

	toggleTheme(): void {
		this.themeService.switchTheme();
	}

	get theme$(): Observable<ThemeType> {
		return this.themeService.theme$;
	}
}
