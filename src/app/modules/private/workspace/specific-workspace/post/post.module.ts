import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { PrimeModule } from '@shared/prime.module';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
	declarations: [
		PostComponent,
		CreatePostComponent
	],
	imports: [
		CommonModule,
		PostRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		PrimeModule
	]
})
export class PostModule { }
