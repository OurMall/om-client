import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-search-engine',
	templateUrl: './search-engine.component.html',
	styleUrls: ['./search-engine.component.scss']
})
export class SearchEngineComponent implements OnInit {

	@Input() placeholder!: string;

	constructor() { }

	ngOnInit(): void {
	}

}
