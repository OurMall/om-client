import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Category, Service } from '@app/common/interfaces';
import { CategoryService, ServiceService } from '@app/common/services';

@Component({
	selector: 'app-user-workspace',
	templateUrl: './user-workspace.component.html',
	styleUrls: ['./user-workspace.component.scss'],
})
export class UserWorkspaceComponent implements OnInit, AfterViewInit {

	categories$!: Observable<Category[]>;
	services$!: Observable<Service[]>;
	userWorkspaceForm!: FormGroup;
	blockSpecial: RegExp = /^[^{}<>*!]+$/

	constructor(
		private categoryService: CategoryService,
		private serviceService: ServiceService,
		private readonly fb: FormBuilder
	) {
		this.userWorkspaceForm = this.fb.group({
			profile: this.fb.group({
				name: [null, [Validators.required]],
				description: [null, [Validators.required, Validators.maxLength(300)]],
				slogan: [null, [Validators.maxLength(100)]],
				logo: [null, [Validators.required]]
			}),
			category: [null, [Validators.required]],
			services: [[], [Validators.required]],
			tags: [[], []]
		});
	}

	ngOnInit(): void {
		this.categoryService.categories().subscribe();
		this.categories$ = this.categoryService.categories$;
		this.serviceService.services().subscribe();
		this.services$ = this.serviceService.services$;
	}

	ngAfterViewInit(): void {}

	onSubmit(): void {
		console.log(this.userWorkspaceForm.value);
	}

	get name() {
		return this.userWorkspaceForm.get("profile.name");
	}

	get description() {
		return this.userWorkspaceForm.get("profile.description");
	}

	get slogan() {
		return this.userWorkspaceForm.get("profile.slogan");
	}

	get logo() {
		return this.userWorkspaceForm.get("profile.logo");
	}

	get category() {
		return this.userWorkspaceForm.get("category");
	}

	get services() {
		return this.userWorkspaceForm.get("services");
	}

	get tags() {
		return this.userWorkspaceForm.get("tags");
	}
}
