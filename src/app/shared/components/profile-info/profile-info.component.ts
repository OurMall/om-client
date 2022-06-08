import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';

import { User } from '@app/common/interfaces';

@Component({
	selector: 'app-profile-info',
	templateUrl: './profile-info.component.html',
	styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {

	@Input() user!: User;
	@Input() isEditingProfile: boolean = false;

	constructor(
		private readonly sanitizer: DomSanitizer,
	) {}

	ngOnInit(): void {}

	secureRedirection(url?: string): string {
		const secure = this.sanitizer.bypassSecurityTrustUrl(url!);
		return secure as string;
	}
}
