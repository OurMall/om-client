import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-product-settings',
    templateUrl: './product-settings.component.html',
    styleUrls: ['./product-settings.component.scss']
})
export class ProductSettingsComponent implements OnInit {

    productForm: FormGroup;

    constructor(
        private readonly fb: FormBuilder
    ) {
        this.productForm = this.fb.group({
            name: [null, [Validators.required]],
            detail: [null, [Validators.required]],
            price: [0, [Validators.required]],
            stock: [0, [Validators.required]],
            images: [[], [Validators.required]],
            status: [0, [Validators.required]],
            is_available: [false, [Validators.required]]
        });
    }

    ngOnInit(): void { }

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
