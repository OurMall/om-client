import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '@app/common/services';
import { User } from '@app/common/interfaces';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
	user$: Observable<User> = this.userService.user$;

	constructor(
		private readonly sanitizer: DomSanitizer,
		private userService: UserService
	) {}

	ngOnInit(): void {}

	ngOnDestroy(): void {}

	secureRedirection(url: string): string {
		const secure = this.sanitizer.bypassSecurityTrustUrl(url);
		return secure as string;
	}
}
