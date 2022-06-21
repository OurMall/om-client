import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService, UserService } from '@app/common/services';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

	forgotPasswordForm: FormGroup;

	constructor(
		private readonly fb: FormBuilder,
		private userService: UserService,
		private message: MessageService
	) {
		this.forgotPasswordForm = this.fb.group({
			email: [null, [Validators.required, Validators.email]]
		});
	}

	ngOnInit(): void {}

	onSubmit(): void {
		const { email } = this.forgotPasswordForm.value;
		this.userService.forgotPassword(email).subscribe({
			complete: () => {
				this.message.info("Enviaremos un correo electrónico si el email se encuentra registrado");
			}
		})
	}

	get email() {
		return this.forgotPasswordForm.get('email');
	}
}
