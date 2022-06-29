import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';

@Component({
	selector: 'app-search-engine',
	templateUrl: './search-engine.component.html',
	styleUrls: ['./search-engine.component.scss'],
})
export class SearchEngineComponent implements OnInit {

	query: FormControl = new FormControl('');

	@Input() placeholder!: string;

	constructor(
		private readonly router: Router,
	) {}

	ngOnInit(): void {
		this.query.valueChanges.pipe(
			map((value) => value?.trim()),
			debounceTime(500),
			distinctUntilChanged(),
			filter(value => value != "" && value.length > 1),
		)
		.subscribe(value => {
			this.router.navigate(["search"], {
				queryParams: {
					query: value,
					limit: 5,
				}
			})
		});
	}
}
