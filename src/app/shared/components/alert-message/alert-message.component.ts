import { Component, Input, OnInit } from '@angular/core';

type AlertType = "info" | "success" | "warning" | "error";

@Component({
	selector: 'app-alert-message',
	templateUrl: './alert-message.component.html',
	styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent implements OnInit {

	opened: boolean = true;
	@Input() closable: boolean = false;
	@Input() severity: AlertType = "info";
	@Input() title!: string;
	@Input() description!: string;

	ngOnInit(): void {}

	onClose(): void {
		this.opened = !this.opened;
	}
}
