import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

	links!: any;

	constructor() {}

	ngOnInit(): void {
		this.links = [
			{
				route: 'home',
				tooltip: 'Home',
				icon: 'uil uil-estate'
			},
			{
				route: 'workspaces',
				tooltip: 'Workspaces',
				icon: 'uil uil-newspaper'
			},
			{
				route: 'help',
				tooltip: 'Help',
				icon: 'uil uil-question'
			},
			{
				route: 'login',
				tooltip: 'Log In',
				icon: 'uil uil-signout'
			}
		]
	}
}
