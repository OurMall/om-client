import { Component, OnInit } from '@angular/core';

import { ProductService } from '@app/common/services';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	subscriptions: Subscription[] = [];

	constructor(
		private productService: ProductService
	) { }

	ngOnInit(): void {
		this.subscriptions.push();
	}

}
