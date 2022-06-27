import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { RippleModule } from 'primeng/ripple';
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
  ],
  exports: [
	TooltipModule,
	TabViewModule,
	RippleModule,
	DynamicDialogModule,
	EditorModule,
	SidebarModule,
  ]
})
export class PrimeModule { }
