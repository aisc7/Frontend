import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageDuenoComponent } from './manage/manage.component'; // Adjust path accordingly

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageDuenoComponent },
  { path: "view/:id", component: ManageDuenoComponent },
  {path: "delete/:id", component: ManageDuenoComponent},
  { path: "update/:id", component: ManageDuenoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuenoRoutingModule { }