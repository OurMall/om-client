import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { User } from '@app/common/interfaces';
import { UserService } from '@app/common/services';

@Component({
	selector: 'app-specific-profile',
	templateUrl: './specific-profile.component.html',
	styleUrls: ['./specific-profile.component.scss'],
})
export class SpecificProfileComponent implements OnInit {

	private userProfileSubject$: Subject<User> = new BehaviorSubject<User>(null!);

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(params => {
			this.userService.specific_account(params['id']).subscribe({
				next: (user) => {
					this.userProfileSubject$.next(user);
					console.log(user);
				},
				error: () => {
					this.router.navigateByUrl('404');
				}
			});
		});
	}

	get userProfile$(): Observable<User> {
		return this.userProfileSubject$.asObservable();
	}
}
