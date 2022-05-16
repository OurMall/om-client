import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@app/common/services';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-loader',
	template: `
		<div class="progress__container om-transition">
			<div class="progress__container__loader" *ngIf="isLoading$ | async"></div>
		</div>
	`,
	styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
	isLoading$!: Observable<boolean>;

	constructor(private readonly loaderService: LoaderService) {}

	ngOnInit(): void {
		this.isLoading$ = this.loaderService.isLoading$.asObservable();
	}
}
