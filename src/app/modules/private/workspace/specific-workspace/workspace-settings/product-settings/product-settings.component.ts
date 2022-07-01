import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

import { ProductStatus, Workspace } from '@app/common/interfaces';
import { MessageService, ProductService, WorkspaceService } from '@app/common/services';

@Component({
    selector: 'app-product-settings',
    templateUrl: './product-settings.component.html',
    styleUrls: ['./product-settings.component.scss']
})
export class ProductSettingsComponent implements OnInit, OnDestroy {

	private workspaceSubject$: BehaviorSubject<Workspace> = new BehaviorSubject<Workspace>(null!);

	subscriptions: Subscription[] = [];
    productForm: FormGroup;
	statuses: string[];
	workspace!: string;

    constructor(
        private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
		private confirmationService: ConfirmationService,
		private productService: ProductService,
		private workspaceService: WorkspaceService,
		private message: MessageService,
    ) {
        this.productForm = this.fb.group({
            name: [null, [Validators.required]],
            detail: [null, [Validators.required, Validators.maxLength(2000)]],
            price: this.fb.group({
				value: [0, [Validators.required]],
				currency: ["COP", []]
			}),
            stock: [0, [Validators.required]],
            images: [[], [Validators.required]],
            status: [0, [Validators.required]],
            is_available: [false, [Validators.required]],
			workspace: [this.workspace, []]
        });
		this.statuses = Object.values(ProductStatus);
    }

    ngOnInit(): void {
		this.subscriptions.push(
			this.activatedRoute.parent!.params.subscribe(params => {
				this.workspace = params['id'];
				this.workspaceService.workspace(this.workspace).subscribe(workspace => {
					this.workspaceSubject$.next(workspace);
				});
			})
		);
	}

	confirm(product_id?: string): void {
		this.confirmationService.confirm({
			header: "Borrar",
			message: "¿Estás seguro de que deseas borrar el producto?",
			accept: () => {
				this.deleteProduct(product_id);
			}
		});
	}

	deleteProduct(product_id?: string): void {
		this.productService.delete(product_id).subscribe({
			complete: () => {
				this.message.success("El producto ha sido eliminado", "Correcto");
			},
			error: (_) => {
				this.message.error("Algo salió mal", "Reintenta");
			}
		});
	}

	onSubmit(): void {
		if(!this.productForm.valid) {
			this.message.warning("Verifica que todos los campos esten llenos");
			return;
		}
		this.productForm.patchValue({
			workspace: this.workspace
		});
		this.productForm.patchValue({
			images: [this.images?.value]
		});
		console.log(this.productForm.value);
		this.subscriptions.push(
			this.productService.createProduct(this.productForm.value).subscribe({
				complete: () => {
					this.message.success("El producto ha sido agregado correctamente");
					this.router.navigateByUrl(`/workspaces/${this.workspace}`);
				},
				error: () => {
					this.message.error("No pudimos crear el producto", "Reintenta");
				}
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => {
			subscription.unsubscribe();
		});
	}

	get workspace$(): Observable<Workspace> {
		return this.workspaceSubject$.asObservable();
	}

    get name() {
        return this.productForm.get('name');
    }

    get detail() {
        return this.productForm.get('detail');
    }

    get value() {
        return this.productForm.get('price.value');
    }

    get stock() {
        return this.productForm.get('stock');
    }

    get images() {
        return this.productForm.get('images');
    }

    get status() {
        return this.productForm.get('status');
    }

    get is_available() {
        return this.productForm.get('is_available');
    }

}
