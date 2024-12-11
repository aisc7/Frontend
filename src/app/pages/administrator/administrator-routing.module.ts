import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAdministratorComponent } from './manage/manage.component'; // Componente de gestión de administradores

const routes: Routes = [
  {path: "list", component: ManageAdministratorComponent },            // Ruta para listar administradores
  { path: "create", component: ManageAdministratorComponent },         // Ruta para crear administrador
  { path: "update/:id", component: ManageAdministratorComponent },     // Ruta para actualizar administrador
  {path: "delete/:id", component: ManageAdministratorComponent},       // Ruta para eliminar administrador
  { path: "view/:id", component: ManageAdministratorComponent },       // Ruta para ver detalles de un administrador
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
