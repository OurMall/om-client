import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

	stepper!: number;
	steps: number[] = [1, 2, 3];

	constructor() {}

	ngOnInit(): void {
		this.stepper = 1;
	}

	changeCurrentStep(nextStep: number): void {
		if(this.stepper >= 3) this.stepper = 0;
		this.stepper = this.stepper + nextStep;
	}
}
