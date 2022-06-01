import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Groups } from '@app/common/interfaces';
import { MessageService, UserService } from '@app/common/services';

@Component({
	selector: 'app-user-role',
	templateUrl: './user-role.component.html',
	styleUrls: ['./user-role.component.scss'],
})
export class UserRoleComponent implements OnInit, OnDestroy {

	private subscription: Subscription = new Subscription();

	roles: Groups[];
	roleForm!: FormGroup;

	@Input() currentStep!: number;
	@Output() nextTurnEvent = new EventEmitter<number>();
	@Output() selectedRole = new EventEmitter<string>();

	constructor(
		private readonly fb: FormBuilder,
		private message: MessageService,
		private userService: UserService,
	) {
		this.roles = [
			{
				value: 'client',
			},
			{
				value: 'seller',
			},
		];
	}

	ngOnInit(): void {
		this.roleForm = this.fb.group({
			role: [null, [Validators.required]],
		});
	}

	onContinue(): void {
		if (!this.roleForm.value || !this.roleForm.valid) {
			this.message.error('Por favor elige un rol', 'Falta algo..');
			return;
		}
		const { role } = this.roleForm.value;
		this.subscription.add(
			this.userService.addGroupToUser(role).subscribe({
				next: (_) => {
					const nextStep = this.currentStep + 1;
					this.nextTurnEvent.emit(nextStep);
					this.selectedRole.emit(role);
				},
				complete: () => {
					this.message.success(`¿Un ${role}? Increíble!`, 'Wow');
				},
				error: (err: HttpErrorResponse) => {
					this.message.error(err.message);
				},
			})
		);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	get role() {
		return this.roleForm.get('role');
	}
}
