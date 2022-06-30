import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegisterComponent } from './cash-register.component';
import { PdfComponent } from './pdf/pdf.component';

const routes: Routes = [
  { 
    path: '', 
    component: CashRegisterComponent 
  },
    {
      path: 'pdf',
      component: PdfComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashRegisterRoutingModule { }
