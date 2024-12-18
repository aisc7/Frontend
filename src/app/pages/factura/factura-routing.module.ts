import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageFacturaComponent } from './manage/manage.component'; // Adjust path accordingly
import { PaymentComponent } from 'src/app/payment/payment.component';

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageFacturaComponent },
  { path: "view/:id", component: ManageFacturaComponent },
  {path: "delete/:id", component: ManageFacturaComponent},
  { path: "update/:id", component: ManageFacturaComponent },
  { path: 'payment/:id', component: PaymentComponent }, // Ruta para PaymentComponent

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }