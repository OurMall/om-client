import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { SidebarModule } from 'primeng/sidebar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
	TooltipModule,
	TabViewModule,
	RippleModule,
	DynamicDialogModule,
	EditorModule,
	SidebarModule,
	ConfirmDialogModule,
	// MatAutocompleteModule, //material
	MatAutocompleteModule, //material
  ],
  exports: [
	TooltipModule,
	TabViewModule,
	RippleModule,
	DynamicDialogModule,
	EditorModule,
	SidebarModule,
	ConfirmDialogModule,
	// MatAutocompleteModule, //material
	MatAutocompleteModule, //material
  ]
})
export class PrimeModule { }
