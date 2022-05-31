import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	HostListener,
	OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService, UserService } from '@app/common/services';
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
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.userService.toggle.subscribe((isOpen) => {
			this.isOpen = isOpen;
		});
	}

	logout(): void {
		this.authenticationService.logOut();
	}

	@HostListener('window:scroll', ['$event'])
	onScroll($event: Event): void {
		//console.log($event);
	}
}
