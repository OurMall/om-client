import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeModule } from '@app/shared/prime.module';
import { SharedModule } from '@app/shared/shared.module';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { SearchResultComponent } from './search-result.component';


@NgModule({
  declarations: [
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    SearchResultRoutingModule,
	PrimeModule,
	SharedModule,
  ]
})
export class SearchResultModule { }
