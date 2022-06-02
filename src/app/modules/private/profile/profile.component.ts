import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserService } from '@app/common/services';
import { User, Workspace } from '@app/common/interfaces';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

	private workspaceSubject$: BehaviorSubject<Workspace[]> = new BehaviorSubject<Workspace[]>([]);
	user$: Observable<User> = this.userService.user$;

	constructor(
		private readonly sanitizer: DomSanitizer,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.user$.subscribe(user => {
			this.workspaceSubject$.next(user.workspaces);
		})
	}

	ngOnDestroy(): void {}

	secureRedirection(url: string): string {
		const secure = this.sanitizer.bypassSecurityTrustUrl(url);
		return secure as string;
	}

	get workspaces$(): Observable<Workspace[]> {
		return this.workspaceSubject$.asObservable();
	}
}
