import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductStatus } from '@app/common/interfaces';
import { MessageService } from '@app/common/services';

@Component({
    selector: 'app-product-settings',
    templateUrl: './product-settings.component.html',
    styleUrls: ['./product-settings.component.scss']
})
export class ProductSettingsComponent implements OnInit, OnDestroy {

    productForm: FormGroup;
	statuses: string[];

    constructor(
        private readonly fb: FormBuilder,
		private message: MessageService
    ) {
        this.productForm = this.fb.group({
            name: [null, [Validators.required]],
            detail: [null, [Validators.required, Validators.maxLength(2000)]],
            price: [0, [Validators.required]],
            stock: [0, [Validators.required]],
            images: [[], [Validators.required]],
            status: [0, [Validators.required]],
            is_available: [false, [Validators.required]]
        });
		this.statuses = Object.values(ProductStatus);
    }

    ngOnInit(): void {}

	onSubmit(): void {
		if(!this.productForm.valid) {
			this.message.warning("Verifica que todos los campos esten llenos");
			return;
		}
		console.log(this.productForm.value);
	}

	ngOnDestroy(): void {}

    get name() {
        return this.productForm.get('name');
    }

    get detail() {
        return this.productForm.get('detail');
    }

    get price() {
        return this.productForm.get('price');
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
