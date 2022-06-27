import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { MessageService, PostService } from '@app/common/services';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

	createPostForm!: FormGroup;
	workspace!: string;

	constructor(
		private readonly fb: FormBuilder,
		private readonly config: DynamicDialogConfig,
		private readonly ref: DynamicDialogRef,
		private postService: PostService,
		private message: MessageService
	) {
		this.createPostForm = this.fb.group({
			title: [null, [Validators.required]],
			content: [null, [Validators.required, Validators.maxLength(3000)]],
			image: [null, []],
			is_public: [true, []],
			workspace: [null, []]
		});
	}

	ngOnInit(): void {
		this.workspace = this.config.data.workspace;
	}

	onSubmit(): void {
		if(!this.createPostForm.valid) {
			this.message.warning('Completa la información requerida');
			return;
		}
		this.createPostForm.patchValue({
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelVna9__Qwt9GifGdE0R4FmsiTmZjoSE1vnC4LXdgozvqbjiOGufuXrladHL7nXowTt4&usqp=CAU',
		});
		this.createPostForm.patchValue({
			workspace: this.workspace
		});
		this.postService.create(this.createPostForm.value).subscribe({
			next: (_) => {
				this.message.success("La publicación ha sido creada", "Excelente");
			},
			complete: () => {
				this.ref.close()
			},
			error: (_) => {
				this.message.error("Algo salió mal", "Oh-no!");
			}
		});
	}

	get title() {
		return this.createPostForm.get('title');
	}

	get content() {
		return this.createPostForm.get('content');
	}

	get image() {
		return this.createPostForm.get('image');
	}

	get is_public() {
		return this.createPostForm.get('is_public');
	}
}
