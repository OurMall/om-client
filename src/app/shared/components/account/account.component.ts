import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService, UserService, ThemeService, ThemeType } from '@app/common/services';
import { User } from '@app/common/interfaces';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {

	isLoggedIn$: Observable<boolean> = this.authenticationService.accessToken$;
	user$: Observable<User> = this.userService.user$;

	@HostBinding('class.is-open')
	isOpen: boolean = false;

	constructor(
		private authenticationService: AuthenticationService,
		private userService: UserService,
		private themeService: ThemeService
	) {}

	ngOnInit(): void {
		this.userService.toggle.subscribe((isOpen) => {
			this.isOpen = isOpen;
		});
		this.theme$.subscribe(theme => {
			console.log(theme)
		})
	}

	logout(): void {
		this.authenticationService.logOut();
	}

	toggleTheme(): void {
		this.themeService.switchTheme();
	}

	get theme$(): Observable<ThemeType> {
		return this.themeService.theme$;
	}
}
