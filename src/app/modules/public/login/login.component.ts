import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthenticationService } from '@app/common/services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

	loginForm!: FormGroup;

	constructor(
		private authenticationService: AuthenticationService,
		private readonly fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: [null, []],
			password: [null, []]
		});
	}
}
