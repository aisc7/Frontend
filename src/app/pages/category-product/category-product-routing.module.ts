import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageCategoryProductComponent } from './manage/manage.component';

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageCategoryProductComponent }, // Create category product
  { path: "update/:id", component: ManageCategoryProductComponent }, // Update category product
  {path: "delete/:id", component: ManageCategoryProductComponent}, // Delete category product
  { path: "view/:id", component: ManageCategoryProductComponent }, // View category product
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryProductRoutingModule { }