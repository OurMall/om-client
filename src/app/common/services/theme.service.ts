import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LocalStorageService } from './storage';

export type ThemeType = "dark-theme" | "light-theme";

@Injectable({
	providedIn: 'root'
})
export class ThemeService {

	private themeSubject$: Subject<ThemeType> = new BehaviorSubject<ThemeType>('dark-theme');

	constructor(
		private localStorageService: LocalStorageService
	) { }

	setUpTheme(): void {
		if(!this.currentTheme) {
			const userThemePreference = window.matchMedia("(prefers-color-scheme: dark)");
			if(userThemePreference.matches) {
				this.localStorageService.set("user_theme", "dark-theme");
			} else {
				this.localStorageService.set("user_theme", "light-theme");
			}
			this.themeSubject$.next(this.localStorageService.get("user_theme"));
		}
		document.body.classList.add(this.currentTheme);
	}

	switchTheme(): void {
		if(this.currentTheme == "light-theme") {
			document.body.classList.remove("light-theme");
			document.body.classList.add("dark-theme");
			this.localStorageService.set("user_theme", "dark-theme");
		} else {
			document.body.classList.remove("dark-theme");
			document.body.classList.add("light-theme");
			this.localStorageService.set("user_theme", "light-theme");
		}
	}

	get currentTheme(): ThemeType {
		return this.localStorageService.get("user_theme");
	}

	get theme$(): Observable<ThemeType> {
		this.themeSubject$.next(this.localStorageService.get("user_theme"));
		return this.themeSubject$.asObservable();
	}
}
