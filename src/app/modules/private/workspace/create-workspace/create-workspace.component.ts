import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Category, Service } from '@app/common/interfaces';
import { CategoryService, ServiceService, WorkspaceService } from '@app/common/services';

@Component({
	selector: 'app-create-workspace',
	templateUrl: './create-workspace.component.html',
	styleUrls: ['./create-workspace.component.scss'],
})
export class CreateWorkspaceComponent implements OnInit {

	categories$: Observable<Category[]> = this.categoryService.categories$;
	services$: Observable<Service[]> = this.serviceService.services$;
	subscriptions: Subscription[] = [];
	servicesList: any[] = [];
	userWorkspaceForm!: FormGroup;
	blockSpecial: RegExp = /^[^{}<>*!]+$/;

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private categoryService: CategoryService,
		private serviceService: ServiceService,
		private workspaceService: WorkspaceService,
	) {
		this.userWorkspaceForm = this.fb.group({
			profile: this.fb.group({
				name: [null, [Validators.required]],
				description: [null, [Validators.required, Validators.maxLength(300)]],
				slogan: [null, [Validators.maxLength(100)]],
				logo: [null, [Validators.required]],
			}),
			category: this.fb.group({
				code_name: [null, [Validators.required]],
			}),
			services: [null, [Validators.required]],
			tags: [[], []],
		});
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.categoryService.categories().subscribe(),
			this.serviceService.services().subscribe()
		);
	}

	onSubmit(): void {
		//this.fileUploadService.upload()
		this.userWorkspaceForm.patchValue({
			services: this.servicesList,
		});
		this.subscriptions.push(
			this.workspaceService.createWorkspace(this.userWorkspaceForm.value).subscribe({
				complete: () => {
					this.router.navigateByUrl('workspaces');
				},
			})
		);
	}

	addServiceToList(service: any, input: HTMLInputElement): void {
		const { code_name } = service;
		const element = this.servicesList.find((service) => service == code_name);
		if (!element && input.checked) {
			this.servicesList.push(code_name);
		} else {
			const index = this.servicesList.indexOf(element);
			this.servicesList.splice(index, 1);
		}
	}

	get name() {
		return this.userWorkspaceForm.get('profile.name');
	}

	get description() {
		return this.userWorkspaceForm.get('profile.description');
	}

	get slogan() {
		return this.userWorkspaceForm.get('profile.slogan');
	}

	get logo() {
		return this.userWorkspaceForm.get('profile.logo');
	}

	get category() {
		return this.userWorkspaceForm.get('category.code_name');
	}

	get services() {
		return this.userWorkspaceForm.get('services');
	}

	get tags() {
		return this.userWorkspaceForm.get('tags');
	}
}
