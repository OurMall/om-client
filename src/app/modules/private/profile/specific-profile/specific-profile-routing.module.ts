import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecificProfileComponent } from './specific-profile.component';

const routes: Routes = [{ path: '', component: SpecificProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificProfileRoutingModule { }
