import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Groups } from '@app/common/interfaces';
import { AuthenticationService, MessageService, UserService } from '@app/common/services';

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
	@Output() selectedRole = new EventEmitter<string>();

	constructor(
		private message: MessageService,
		private userService: UserService,
		private readonly fb: FormBuilder
	) {}

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
		if (!this.roleForm.value) {
			this.message.error('Por favor elige un rol', 'Falta algo..');
			return;
		}
		const { role } = this.roleForm.value;
		this.userService.addGroupToUser(role).subscribe({
			next: (_) => {
				this.message.success(`¿Un ${role}? Increíble!`, 'Wow');
				const nextStep = this.currentStep + 1;
				this.nextTurnEvent.emit(nextStep);
				this.selectedRole.emit(role);
			},
			error: (err: HttpErrorResponse) => {
				this.message.error(err.message);
			},
		});
	}

	get role() {
		return this.roleForm.get('role');
	}
}
