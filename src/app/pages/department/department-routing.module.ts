import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageDepartmentComponent } from './manage/manage.component';

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageDepartmentComponent }, // Create department
  { path: "update/:id", component: ManageDepartmentComponent }, // Update department
  {path: "delete/:id", component: ManageDepartmentComponent}, // Delete department
  { path: "view/:id", component: ManageDepartmentComponent }, // View department
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }