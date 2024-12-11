import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageServicioComponent } from './manage/manage.component';  // Cambio de nombre aquí

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'create', component: ManageServicioComponent },  // Usamos ManageServicioComponent
  { path: 'update/:id', component: ManageServicioComponent },  // Usamos ManageServicioComponent
  {path: 'delete/:id', component: ManageServicioComponent},  // Usamos ManageServicioComponent
  { path: 'view/:id', component: ManageServicioComponent }   // Usamos ManageServicioComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
