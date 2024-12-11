import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageOwnerVehicleComponent } from './manage/manage.component'; // Adjust path accordingly

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageOwnerVehicleComponent },
  { path: "view/:id", component: ManageOwnerVehicleComponent },
  {path: "delete/:id", component: ManageOwnerVehicleComponent}, 
  { path: "update/:id", component: ManageOwnerVehicleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerVehicleRoutingModule { }