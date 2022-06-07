import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

import { MessageService, UserService } from '@app/common/services';
import { User, Workspace } from '@app/common/interfaces';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

	private isEditingProfileSubject$: Subject<boolean> = new BehaviorSubject<boolean>(false);
	private workspaceSubject$: Subject<Workspace[]> = new BehaviorSubject<Workspace[]>([]);

	user$: Observable<User> = this.userService.user$;
	subscriptions: Subscription[] = [];
	isEditingProfile: boolean = false;
	accountForm!: FormGroup;
	user_id!: string;

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
				this.user_id = user.id;
			})
		);
		this.accountForm = this.fb.group({
			profile: this.fb.group({
				picture: ['', []],
				biography: [null, [Validators.minLength(10), Validators.maxLength(500)]],
				website: [null, []]
			})
		});
	}

	secureRedirection(url: string): string {
		const secure = this.sanitizer.bypassSecurityTrustUrl(url);
		return secure as string;
	}

	changeEditProfileStatus(currentStatus: boolean): void {
		this.isEditingProfile = !currentStatus;
		if(!this.isEditingProfile || this.isEditingProfile) {
			this.subscriptions.push(
				this.userService.account().subscribe()
			);
		}
		this.isEditingProfileSubject$.next(this.isEditingProfile);
	}

	onSubmit(): void {
		if(!this.accountForm.valid) {
			this.message.error("Rellena la información requerida");
			return;
		}
		this.subscriptions.push(
			this.userService.editAccount(this.user_id, this.accountForm.value).subscribe({
				complete: () => {
					this.changeEditProfileStatus(this.isEditingProfile);
				}
			})
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

	get picture() {
		return this.accountForm.get('profile.picture');
	}

	get biography() {
		return this.accountForm.get('profile.biography');
	}

	get website() {
		return this.accountForm.get('profile.website');
	}
}
