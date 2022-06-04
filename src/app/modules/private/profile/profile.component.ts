import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { MessageService, UserService } from '@app/common/services';
import { User, Workspace } from '@app/common/interfaces';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

	private isEditingProfileSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private workspaceSubject$: BehaviorSubject<Workspace[]> = new BehaviorSubject<Workspace[]>([]);

	user$: Observable<User> = this.userService.user$;
	subscriptions: Subscription[] = [];
	isEditingProfile: boolean = false;
	profileForm!: FormGroup;

	constructor(
		private readonly sanitizer: DomSanitizer,
		private readonly fb: FormBuilder,
		private userService: UserService,
		private message: MessageService
	) {}

	ngOnInit(): void {
		this.subscriptions.push(
			this.userService.account().subscribe(user => {
				this.workspaceSubject$.next(user.workspaces);
			})
		);
		this.profileForm = this.fb.group({
			biography: [null, [Validators.nullValidator, Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
			website: [null, [Validators.nullValidator]]
		});
	}

	secureRedirection(url: string): string {
		const secure = this.sanitizer.bypassSecurityTrustUrl(url);
		return secure as string;
	}

	changeEditProfileStatus(currentStatus: boolean): void {
		this.isEditingProfile = !currentStatus;
		if(!this.isEditingProfile) {
			this.subscriptions.push(
				this.userService.account().subscribe()
			);
		}
		this.isEditingProfileSubject$.next(this.isEditingProfile);
	}

	onSubmit(): void {
		if(!this.profileForm.valid) {
			this.message.error("Rellena la información requerida");
			return;
		}
		console.log(this.profileForm.value);
		this.subscriptions.push(
			this.userService.editAccount(this.profileForm.value).subscribe()
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => {
			subscription.unsubscribe()
		});
	}

	get workspaces$(): Observable<Workspace[]> {
		return this.workspaceSubject$.asObservable();
	}

	get isEditingProfile$(): Observable<boolean> {
		return this.isEditingProfileSubject$.asObservable();
	}

	get biography() {
		return this.profileForm.get('biography');
	}

	get website() {
		return this.profileForm.get('website');
	}
}
