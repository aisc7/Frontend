import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageCuotaComponent } from './manage/manage.component';

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: 'create', component: ManageCuotaComponent }, // Create cuota
  { path: 'update/:id', component: ManageCuotaComponent }, // Update cuota
  {path: 'delete/:id', component: ManageCuotaComponent}, // Delete cuota
  { path: 'view/:id', component: ManageCuotaComponent }, // View cuota
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuotaRoutingModule { }