import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessageService } from '@app/common/services';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {

	signupForm!: FormGroup;
	@Output() nextStepEvent = new EventEmitter<number>();

	constructor(
		private fb: FormBuilder,
		private message: MessageService
	) {}

	ngOnInit(): void {
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

	onSubmit(): void {
		if (!this.validate()) {
			this.message.error("Los datos del formulario son inválidos o no coinciden");
			return;
		}
		this.nextStepEvent.emit(2);
	}

	private validate(): boolean {
		return this.confirm_password?.value == this.password?.value && this.accept_terms ? true : false;
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
