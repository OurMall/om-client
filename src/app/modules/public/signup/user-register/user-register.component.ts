import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService, MessageService } from '@app/common/services';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {

	visiblePassword!: boolean;
	signupForm!: FormGroup;
	@Input() currentStep!: number;
	@Output() nextStepEvent = new EventEmitter<number>();

	constructor(
		private fb: FormBuilder,
		private message: MessageService,
		private authService: AuthenticationService
	) {}

	ngOnInit(): void {
		this.visiblePassword = false;
		this.signupForm = this.fb.group({
			given_name: [null, [Validators.required]],
			family_name: [null, [Validators.required]],
			phone_number: [null, [Validators.required, Validators.minLength(10)]],
			email: [null, [Validators.required, Validators.email]],
			password: [null, [Validators.required, Validators.minLength(8)]],
			confirm_password: [null, [Validators.required, Validators.minLength(8)]],
			birthdate: [null, [Validators.required]],
			gender: [null, [Validators.required]],
			accept_terms: [null, [Validators.required]],
		});
	}

	onContinue(): void {
		if (!this.validate()) {
			this.message.error('Verifica que los datos sean correctos');
			return;
		}
		this.authService.signUp(this.signupForm.value).subscribe({
			next: (response) => {
				console.log(response);
				this.message.success("Continuamos con tu rol...", "Estúpendo");
				const nextStep = this.currentStep + 1;
				this.nextStepEvent.emit(nextStep);
			},
			error: (err: HttpErrorResponse) => {
				console.log(err);
				this.message.error("El usuario ya está registrado", "Oh-no!");
			}
		})
	}

	showPassword(): void {
		this.visiblePassword = !this.visiblePassword;
	}

	private validate(): boolean {
		return this.confirm_password?.value == this.password?.value && this.accept_terms
			? true
			: false;
	}

	get given_name() {
		return this.signupForm.get('given_name');
	}

	get family_name() {
		return this.signupForm.get('family_name');
	}

	get phone_number() {
		return this.signupForm.get('phone_number');
	}

	get email() {
		return this.signupForm.get('email');
	}

	get password() {
		return this.signupForm.get('password');
	}

	get confirm_password() {
		return this.signupForm.get('confirm_password');
	}

	get birthdate() {
		return this.signupForm.get('birthdate');
	}

	get gender() {
		return this.signupForm.get('gender');
	}

	get accept_terms() {
		return this.signupForm.get('accept_terms');
	}
}
