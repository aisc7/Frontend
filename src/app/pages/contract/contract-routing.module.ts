import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageContractComponent } from './manage/manage.component';

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageContractComponent }, // Create contract
  { path: "update/:id", component: ManageContractComponent }, // Update contract
  {path: "delete/:id", component: ManageContractComponent}, // Delete contract  
  { path: "view/:id", component: ManageContractComponent }, // View contract
  {path: 'filterByCustomer/:id', component:ListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConductorRoutingModule { }