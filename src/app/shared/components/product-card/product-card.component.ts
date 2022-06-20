import { Component, Input, OnInit } from '@angular/core';
import {
	trigger,
	state,
	style,
	transition,
	animate
} from '@angular/animations';
import { Product } from '@app/common/interfaces';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
	animations: [
		trigger('flipState', [
			state(
				'active',
				style({
					transform: 'rotateY(179deg)',
				})
			),
			state(
				'inactive',
				style({
					transform: 'rotateY(0)',
				})
			),
			transition('active => inactive', animate('500ms ease-out')),
			transition('inactive => active', animate('500ms ease-in')),
		]),
	],
})
export class ProductCardComponent implements OnInit {

	@Input() product!: Product;

	flip: string;

	constructor() {
		this.flip = "inactive";
	}

	ngOnInit(): void {}

	toggleFlip(): void {
		this.flip = this.flip == 'inactive' ? 'active' : 'inactive';
	}
}
