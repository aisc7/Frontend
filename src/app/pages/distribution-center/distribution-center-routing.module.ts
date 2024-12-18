import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageDistributionCenterComponent } from './manage/manage.component'; // Adjust path accordingly

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageDistributionCenterComponent },
  { path: "view/:id", component: ManageDistributionCenterComponent },
  {path: "delete/:id", component: ManageDistributionCenterComponent},
  { path: "update/:id", component: ManageDistributionCenterComponent },
  { path: "filterByMunicipality/:id", component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributionCenterRoutingModule { }