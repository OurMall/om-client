import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, UserService } from '@app/common/services';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

	private token!: string;

	subscriptions: Subscription[] = [];
	resetPasswordForm: FormGroup;
	showPassword: boolean = false;

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly fb: FormBuilder,
		private userService: UserService,
		private message: MessageService,
	) {
		this.resetPasswordForm = this.fb.group({
			new_password: [null, [Validators.required, Validators.minLength(8)]],
			confirm_password: [null, [Validators.required, Validators.minLength(8)]],
			token: [null, []]
		});
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.activatedRoute.queryParams.subscribe(params => {
				if(!params['token']) {
					this.router.navigateByUrl('login/forgotPassword')
					return;
				}
				this.token = params['token'];
			})
		)
	}

	checkPassword(event: Event): void {
		const element: HTMLInputElement = (event.target as HTMLInputElement);
		this.showPassword = element.checked;
	}

	onSubmit(): void {
		if(!this.validate() || !this.resetPasswordForm.valid) {
			this.message.warning("Verifica que los datos sean correctos");
			return;
		}
		this.resetPasswordForm.patchValue({
			token: this.token
		})
		console.log(this.resetPasswordForm.value);
		this.subscriptions.push(
			this.userService.resetPassword(this.resetPasswordForm.value).subscribe({
				complete: () => {
					this.router.navigateByUrl('login');
				},
			})
		);
	}

	private validate(): boolean {
		return !!(this.new_password?.value == this.confirm_password?.value);
	}

	get new_password() {
		return this.resetPasswordForm.get('new_password');
	}

	get confirm_password() {
		return this.resetPasswordForm.get('confirm_password');
	}
}
