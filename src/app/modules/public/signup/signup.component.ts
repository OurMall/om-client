import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

	stepper!: number;
	role: string = "seller";

	constructor() {}

	ngOnInit(): void {
		this.stepper = 1;
	}

	incrementStep(): void {
		if (this.stepper >= 3) this.stepper = 0;
		this.stepper++;
	}

	changeCurrentStep(nextStep: number): void {
		if (this.stepper >= 3) this.stepper = 1;
		this.stepper = nextStep;
	}

	setUserRole(newRole: string): void {
		this.role = newRole;
	}
}
