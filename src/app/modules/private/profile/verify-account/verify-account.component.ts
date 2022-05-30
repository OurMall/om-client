import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/common/services';

@Component({
	selector: 'app-verify-account',
	templateUrl: './verify-account.component.html',
	styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit {

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private userService: UserService,
	) {}

	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe(params => {
			const { token } = params;
			if(!token) {
				this.router.navigate(["profile"]);
				return;
			}
			this.userService.verifyAccount(token).subscribe({
				error: (_) => {
					this.router.navigate(["profile"]);
				}
			});
		})
	}
}
