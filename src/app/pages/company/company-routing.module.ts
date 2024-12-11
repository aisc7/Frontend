import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageCompanyComponent } from './manage/manage.component';

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageCompanyComponent }, // Create company
  { path: "update/:id", component: ManageCompanyComponent }, // Update company
  {path: "delete/:id", component: ManageCompanyComponent}, // Delete company
  { path: "view/:id", component: ManageCompanyComponent }, // View company
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }