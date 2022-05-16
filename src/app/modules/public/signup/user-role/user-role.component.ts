import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Groups } from '@app/common/interfaces';

@Component({
	selector: 'app-user-role',
	templateUrl: './user-role.component.html',
	styleUrls: ['./user-role.component.scss'],
})
export class UserRoleComponent implements OnInit {
	roleForm!: FormGroup;
	roles!: Groups[];
	@Input() currentStep!: number;
	@Output() nextTurnEvent = new EventEmitter<number>();

	constructor(private readonly fb: FormBuilder) {}

	ngOnInit(): void {
		this.roles = [
			{
				value: 'client',
			},
			{
				value: 'seller',
			},
		];
		this.roleForm = this.fb.group({
			role: [null, [Validators.required]],
		});
	}

	onContinue(): void {
		console.log('continue...');
		console.log(this.roleForm.value);
		const nextStep = this.currentStep + 1;
		this.nextTurnEvent.emit(nextStep);
	}

	get role() {
		return this.roleForm.get('role');
	}
}
