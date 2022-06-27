import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService, MessageService } from '@app/common/services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private message: MessageService,
		private authenticationService: AuthenticationService
	) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: [null, [Validators.required, Validators.email]],
			password: [null, [Validators.required]],
		});
	}

	onSubmit(): void {
		if (!this.loginForm.valid) return;
		this.authenticationService.logIn(this.loginForm.value).subscribe({
			next: (_) => {
				this.message.success('Nos agrada tenerte de vuelta!', 'Bienvenido');
				this.router.navigateByUrl('profile');
			},
			error: (_) => {
				this.message.error('Los datos que ingresaste son erróneos');
			},
		});
	}

	get email() {
		return this.loginForm.get('email');
	}

	get password() {
		return this.loginForm.get('password');
	}
}
