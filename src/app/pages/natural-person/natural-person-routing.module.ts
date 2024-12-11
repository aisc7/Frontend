import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageNaturalPersonComponent } from './manage/manage.component'; // Adjust path accordingly

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageNaturalPersonComponent },
  { path: "view/:id", component: ManageNaturalPersonComponent },
  {path: "delete/:id", component: ManageNaturalPersonComponent},
  { path: "update/:id", component: ManageNaturalPersonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NaturalPersonRoutingModule { }