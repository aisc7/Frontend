import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageMunicipalityComponent } from './manage/manage.component'; // Adjust path accordingly

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageMunicipalityComponent },
  { path: "update/:id", component: ManageMunicipalityComponent },
  {path: "delete/:id", component: ManageMunicipalityComponent}, 
  { path: "view/:id", component: ManageMunicipalityComponent },
  { path: "filterByDepartment/:id", component:ListComponent},
  {
    path: "createForDepartment/:department_id",
    component: ManageMunicipalityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipalityRoutingModule { }