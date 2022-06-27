import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@app/common/interfaces';
import { UserService, WorkspaceService } from '@app/common/services';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CreatePostComponent } from './create-post/create-post.component';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

	private postsSubject$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

	subscriptions: Subscription[] = [];
	workspace!: string;

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly dialogService: DialogService,
		private userService: UserService,
		private workspaceService: WorkspaceService
	) { }

	ngOnInit(): void {
		this.subscriptions.push(
			this.activatedRoute.parent!.parent!.params.subscribe(params => {
				this.workspace = params['id'];
				this.workspaceService.workspace(this.workspace).subscribe(workspace => {
					console.log(workspace);
					this.postsSubject$.next(workspace.posts);
				});
			})
		);
	}

	createPost(): void {
		this.dialogService.open(CreatePostComponent, {
			data: {
				workspace: this.workspace
			},
			header: 'Crear publicación',
			width: '450px',
			closeOnEscape: true,
			dismissableMask: true,
			styleClass: 'post__dialog',
		});
	}

	get isWorkspaceOwner$(): Observable<boolean> {
		return this.userService.userIsWorkspaceOwner$;
	}

	get posts$(): Observable<Post[]> {
		return this.postsSubject$.asObservable();
	}
}
