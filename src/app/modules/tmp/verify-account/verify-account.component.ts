import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService, UserService } from '@app/common/services';

@Component({
	selector: 'app-verify-account',
	template: `
		<h2>Verificando la cuenta...</h2>
	`,
	styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit {

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private message: MessageService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe(params => {
			const { token } = params;
			this.userService.verifyAccount(token).subscribe({
				next: (_) => {
					console.log(_);
					this.message.success("Hemos verificado la cuenta", "Felicidades!");
					this.router.navigate([""]);
				},
				error: (err: HttpErrorResponse) => {
					console.log(err);
					this.message.error("Tu cuenta ya ha sido verificada", "Oh-no!");
					this.router.navigate([""]);
				},
			});
		})
	}
}
