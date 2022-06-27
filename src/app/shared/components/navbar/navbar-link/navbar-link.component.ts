import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'nav-link',
	template: `
		<a pRipple class="link" routerLinkActive="link-active" [routerLink]="route" [pTooltip]="tooltip" tooltipPosition="bottom" role="link">
			<i class="icon {{ icon }}"></i>
			<!--<span class="link__title">{{ tooltip }}</span>-->
		</a>
	`,
	styleUrls: ['./navbar-link.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarLinkComponent implements OnInit {
	@Input() route!: string;
	@Input() tooltip!: string;
	@Input() icon!: string;

	constructor() {}

	ngOnInit(): void {}
}
