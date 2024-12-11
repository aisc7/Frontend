import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageCustomerComponent } from './manage/manage.component';

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageCustomerComponent }, // Create customer
  { path: "update/:id", component: ManageCustomerComponent }, // Update customer
  {path: "delete/:id", component: ManageCustomerComponent}, // Delete customer
  { path: "view/:id", component: ManageCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }